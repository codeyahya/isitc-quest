import { QuestState, ServiceId } from './types';
import { services } from './content';

export function trackerText(state: QuestState): string {
  return ['Objectifs', ...services.map((service) => `${state.completed.includes(service.id) ? '✓' : '○'} ${service.label}`)].join('<br>');
}

export function complete(state: QuestState, service: ServiceId): boolean {
  state.started = true;
  if (state.completed.includes(service)) return false;
  state.completed.push(service);
  return true;
}

export function quizStatus(service: ServiceId, state: QuestState): { answered: number; total: number; complete: boolean } {
  const prefix = `${service}-`;
  const answered = state.quiz.answered.filter((id) => id.startsWith(prefix)).length;
  const total = 3;
  return { answered, total, complete: answered >= total };
}
