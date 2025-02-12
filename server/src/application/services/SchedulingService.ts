export class SchedulingService {
    calculateNextReviewDate(category: string): Date {
      const daysMap = {
        FIRST: 1,
        SECOND: 2,
        THIRD: 4,
        FOURTH: 8,
        FIFTH: 16,
        SIXTH: 32,
        SEVENTH: 64,
      };
  
      const daysToAdd = daysMap[category as keyof typeof daysMap] || 1;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + daysToAdd);
  
      return nextDate;
    }
  }
  