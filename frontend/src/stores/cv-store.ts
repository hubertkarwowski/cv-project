import { create } from 'zustand';

export interface ProfileAndBio {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  city: string | null;
  postalCode: string | null;
  nationality: string | null;
  website: string | null;
  generalDescription: string;
  photo: string | undefined;
}

export interface Timeline {
  company: string;
  position: string;
  city: string;
  startMonthJob: number | null;
  startYearJob: number | null;
  endMonthJob: number | null;
  endYearJob: number | null;
  descriptionJob: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  isCurrent: boolean;
  startMonth: number | null;
  startYear: number | null;
  endMonth: number | null;
  endYear: number | null;
  description: string;
}

export interface SkillsAndExtras {
  skills: { name: string | null }[];
  certificates: { name: string | null }[];
  courses: { name: string | null }[];
  languages: { name: string; level: string }[];
  hobby: string;
}

export interface CvState {
  currentStep: number;
  profileAndBio: ProfileAndBio;
  timeline: Timeline[];
  skillsAndExtras: SkillsAndExtras;
}

export interface CvActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetCvStore: () => void;

  setFields: <T extends 'profileAndBio' | 'skillsAndExtras'>(
    stepKey: T,
    fields: Partial<CvState[T]>
  ) => void;

  addItem: <
    T extends 'timeline' | 'skillsAndExtras',
    SubK extends keyof CvState[T],
  >(
    stepKey: T,
    arrayKey: SubK,
    item: CvState[T][SubK] extends (infer U)[] ? U : never
  ) => void;

  removeItem: <
    T extends 'timeline' | 'skillsAndExtras',
    SubK extends keyof CvState[T],
  >(
    stepKey: T,
    arrayKey: SubK,
    index: number
  ) => void;
}

interface CvStore extends CvState {
  actions: CvActions;
}

const initialCvState: CvState = {
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
    photo: undefined,
  },
  timeline: [],
  skillsAndExtras: {
    skills: [],
    certificates: [],
    courses: [],
    languages: [],
    hobby: '',
  },
};

export const useCvStore = create<CvStore>((set) => ({
  ...initialCvState,

  actions: {
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () =>
      set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
    goToStep: (step) => set({ currentStep: step }),
    resetCvStore: () => set(initialCvState),

    setFields: (stepKey, fields) =>
      set((state) => ({
        [stepKey]: { ...state[stepKey], ...fields },
      })),

    addItem: (stepKey, arrayKey, item) =>
      set((state) => ({
        [stepKey]: {
          ...state[stepKey],
          [arrayKey]: [
            ...(state[stepKey][arrayKey] as Array<typeof item>),
            item,
          ],
        },
      })),

    removeItem: (stepKey, arrayKey, index) =>
      set((state) => ({
        [stepKey]: {
          ...state[stepKey],
          [arrayKey]: (state[stepKey][arrayKey] as unknown[]).filter(
            (_, i) => i !== index
          ),
        },
      })),
  },
}));
