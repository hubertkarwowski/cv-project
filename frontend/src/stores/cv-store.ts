import { create } from 'zustand';

export interface ProfileAndBio {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  postalCode: string;
  nationality: string;
  website: string;
  generalDescription: string;
  photo: string;
}

export interface Timeline {
  company: string;
  position: string;
  city: string;
  startMonthJob: number | undefined;
  startYearJob: number | undefined;
  endMonthJob: number | undefined;
  endYearJob: number | undefined;
  descriptionJob: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  isCurrent: boolean;
  startMonth: number | undefined;
  startYear: number | undefined;
  endMonth: number | undefined;
  endYear: number | undefined;
  description: string;
}

export interface SkillsAndExtras {
  skills: string;
  certificates: string;
  courses: string;
  languages: string;
  hobby: string;
}

export interface CvFormData {
  currentStep: number;
  profileAndBio: ProfileAndBio;
  timeline: Timeline;
  skillsAndExtras: SkillsAndExtras;
}

type CvSteps = 'profileAndBio' | 'timeline' | 'skillsAndExtras';

export interface CvActions {
  goToStep: (step: number) => void;
  resetCvStore: () => void;

  setFields: <K extends keyof Omit<CvFormData, 'currentStep'>>(
    stepKey: K,
    updates: Partial<CvFormData[K]>
  ) => void;

  addItem: <T extends CvSteps, K extends keyof CvFormData[T]>(
    stepKey: T,
    fieldKey: K,
    newItem: CvFormData[T][K]
  ) => void;

  removeItem: <T extends CvSteps>(
    stepKey: T,
    fieldKey: keyof CvFormData[T]
  ) => void;
}

interface CvStore extends CvFormData {
  actions: CvActions;
}

const initialCvState: CvFormData = {
  currentStep: 1,
  profileAndBio: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    postalCode: '',
    nationality: '',
    website: '',
    generalDescription: '',
    photo: '',
  },
  timeline: {
    company: '',
    position: '',
    city: '',
    startMonthJob: undefined,
    startYearJob: undefined,
    endMonthJob: undefined,
    endYearJob: undefined,
    descriptionJob: '',
    degree: '',
    fieldOfStudy: '',
    institution: '',
    isCurrent: false,
    startMonth: undefined,
    startYear: undefined,
    endMonth: undefined,
    endYear: undefined,
    description: '',
  },
  skillsAndExtras: {
    skills: '',
    certificates: '',
    courses: '',
    languages: '',
    hobby: '',
  },
};

export const useCvStore = create<CvStore>((set, get) => ({
  ...initialCvState,

  actions: {
    goToStep: (step) => set({ currentStep: step }),
    resetCvStore: () => set(initialCvState),

    setFields: (stepKey, updates) =>
      set((state) => ({
        [stepKey]: { ...state[stepKey], ...updates },
      })),

    addItem: (stepKey, fieldKey, newItem) => {
      const currentVal = get()[stepKey][fieldKey];

      if (currentVal === newItem) return;

      set((state) => ({
        [stepKey]: {
          ...state[stepKey],
          [fieldKey as string]: newItem,
        },
      }));
    },

    removeItem: (stepKey, fieldKey) =>
      set((state) => ({
        [stepKey]: {
          ...state[stepKey],
          [fieldKey as string]: '',
        },
      })),
  },
}));
