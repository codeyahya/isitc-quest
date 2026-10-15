import { quizzes } from './content';
import { quizStatus } from './quests';
import { QuestState, ServiceId } from './types';

export interface QuizResult { correct: boolean; serviceComplete: boolean; scoreDelta: number }

export function showQuiz(element: HTMLElement, service: ServiceId, state: QuestState, done: (result: QuizResult) => void): void {
  const questions = quizzes[service].filter((question) => !state.quiz.answered.includes(question.id));
  if (!questions.length) {
    const status = quizStatus(service, state);
    element.classList.remove('hidden');
    element.innerHTML = `<div class="panel quiz-panel"><h2>Quiz déjà terminé</h2><p>Cette série est complète : ${status.total}/${status.total} questions répondues.</p><button id="quiz-continue">Continuer</button></div>`;
    element.querySelector('#quiz-continue')?.addEventListener('click', () => { element.classList.add('hidden'); done({ correct: false, serviceComplete: true, scoreDelta: 0 }); });
    return;
  }
  let index = 0;
  let correctCount = 0;
  const renderQuestion = (): void => {
    const question = questions[index];
    element.classList.remove('hidden');
    element.innerHTML = `<div class="panel quiz-panel"><p class="quiz-progress">Question ${index + 1}/${questions.length} · Score : ${state.quiz.score}</p><h2>Quiz — ${service}</h2><p>${question.question}</p><div class="answers">${question.answers.map((answer, i) => `<button data-answer="${i}">${i + 1}. ${answer}</button>`).join('')}</div></div>`;
    element.querySelectorAll<HTMLButtonElement>('button').forEach((button) => button.addEventListener('click', () => {
      const isCorrect = Number(button.dataset.answer) === question.correct;
      state.quiz.answered.push(question.id);
      state.quiz.totalAnswered += 1;
      if (isCorrect) { state.quiz.correct += 1; state.quiz.score += 10; correctCount += 1; }
      element.innerHTML = `<div class="panel"><h2>${isCorrect ? 'Bonne réponse !' : 'À retenir'}</h2><p>${question.explanation}</p><p>${isCorrect ? '+10 points.' : '0 point pour cette réponse.'}</p><button id="quiz-next">${index + 1 < questions.length ? 'Question suivante' : 'Voir le résultat'}</button></div>`;
      element.querySelector('#quiz-next')?.addEventListener('click', () => {
        index += 1;
        if (index < questions.length) renderQuestion();
        else {
          const status = quizStatus(service, state);
          element.innerHTML = `<div class="panel"><h2>Résultat du quiz</h2><p>${correctCount}/${questions.length} bonne(s) réponse(s).</p><p>Score total : ${state.quiz.score} points.</p><p>${state.quiz.score >= 80 ? 'Très bon départ !' : 'Continue à explorer et à apprendre à ton rythme.'}</p><button id="quiz-finish">Continuer</button></div>`;
          element.querySelector('#quiz-finish')?.addEventListener('click', () => { element.classList.add('hidden'); done({ correct: correctCount > 0, serviceComplete: status.complete, scoreDelta: correctCount * 10 }); });
        }
      });
    }));
  };
  renderQuestion();
}
