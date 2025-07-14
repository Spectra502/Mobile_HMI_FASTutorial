import { useState } from 'react';
import { CarModel } from '../constants/types';

export function useHomeViewModel() {
  const [showQuickTour, setShowQuickTour] = useState(false);
  const currentCar: CarModel = { id: 'bmwLFE', fullTitle: 'BMW LFE' };
  return { showQuickTour, setShowQuickTour, currentCar };
}
