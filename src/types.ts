export interface SimulatorState {
  userName: string;
  fieldOfInterest: string;
  discountPercentage: number;
  modulesCompleted: number;
  sessionsDone: number;
  sessionsLeft: number;
  mentorRating: number;
  daysInactive: number;
  campaignTriggered: string; // 'UC-01' | 'UC-02' | 'UC-03' | 'UC-04'
}

export type ActiveTab = 'UC-01' | 'UC-02' | 'UC-03' | 'UC-04';
