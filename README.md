# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 1. Folder & File Structure
project-root/
├── app/
│   ├── _layout.tsx                  ← RootLayout: wraps in Profile & QuizService providers, theme, Stack navigator
│   └── (tabs)/                      ← Bottom-tabs group
│       ├── _layout.tsx              ← TabsLayout: Home, Quiz, Profile
│       ├── index.tsx                ← HomeScreen route
│       ├── quiz.tsx                 ← QuizScreen route
│       └── profile.tsx              ← ProfileScreen route
│
├── app/quick-tour/
│   └── [chapter].tsx                ← QuickTourRoute: uses `useLocalSearchParams` → QuickTourView
│
├── app/quiz/
│   └── [chapter].tsx                ← QuizRoute: uses `useLocalSearchParams` → QuestionScreen
│
├── components/                      ← Reusable UI components & screens
│   ├── HomeScreen.tsx               ← Home wrapper; renders toolbar, QuickTourCard, HomeSection, launch buttons
│   ├── HomeToolbar.tsx              ← Top search/bookmark bar
│   ├── SearchOverlay.tsx            ← Full-screen search modal
│   ├── HomeSection.tsx              ← Tutorial list + progress bar
│   ├── QuickTourCard.tsx            ← “Tutorial starten” card (handles its own `router.push`)
│   ├── QuickTourView.tsx            ← PagerView carousel + nav + actions
│   ├── QuickTourPage*.tsx           ← One file per tour page (order must match `allChapters`)
│   ├── StepProgressBar.tsx          ← Top-of-screen step indicator
│   ├── TextWithSidebar.tsx          ← Sidebar-style annotated text helper
│   ├── PlaceholderImage.tsx         ← Stub for GIFs/illustrations
│   ├── QuizScreen.tsx               ← Test vs. Fahrpunkte tabs, launch logic
│   ├── FahrpunkteScreen.tsx         ← Circular-gauge “Fahrpunkte” view
│   ├── QuestionScreen.tsx           ← PagerView question modal + feedback overlay
│   ├── CustomProgressBar.tsx        ← Linear bar for tutorial progress
│   ├── GaugeProgress.tsx            ← Circular progress for Fahrpunkte
│   └── AssistantButton.tsx          ← Chapter button (tutorial & quiz variants)
│
├── context/
│   ├── ProfileContext.tsx           ← Port of your Swift `ProfileStore`
│   └── QuizServiceContext.tsx       ← Port of Swift `QuizService` (questions, answers, correctness)
│
├── hooks/
│   └── useHomeViewModel.ts          ← Port of Swift `HomeViewModel` (currentCar, quick-tour flag)
│
├── constants/
│   ├── colors.ts
│   ├── spacing.ts
│   └── types.ts                     ← `enum TourChapter`, `allChapters: TourChapter[]`, CarModel, etc.
│
├── assets/                          ← Images, fonts, media
├── app.json / tsconfig.json         ← Expo config, path aliases (`@/` → `project-root`)
└── README.md                        ← ← this file


## 2. File-Based Routing
app/_layout.tsx

Wraps the entire app in:

<ProfileProvider> & other contexts

<ThemeProvider> (light/dark theme)

<Stack> (React Navigation stack under the hood)

Declares two Stack screens:

"(tabs)" → mounts the bottom-tabs group

"+not-found" → catch-all for unknown routes

app/(tabs)/_layout.tsx

Renders a <Tabs> navigator with three tabs:

index → / → Home

quiz → /quiz

profile → /profile

headerShown: false removes the default header

Route files (index.tsx, quiz.tsx, profile.tsx) simply render the corresponding screen component.


## 3. Navigation & Modals

Home → QuickTour and Quiz → Question use router.push() to open dynamic routes:
router.push({
  pathname: '/quick-tour/[chapter]',
  params: { chapter: TourChapter.ACC, showOverlay: 'true' },
});

Modals (SwiftUI’s fullScreenCover) are implemented by registering the dynamic route in the root Stack with presentation: 'modal':

<Stack.Screen
  name="quick-tour/[chapter]"
  options={{ presentation: 'modal', headerShown: false }}
/>

## 4. Context & State Management

ProfileContext.tsx
Tracks finished chapters, bookmarks, profile code

Hook: useProfile() → .isChapterFinished(ch), .markChapterFinished(ch), .areAllChaptersFinished(), etc.

QuizServiceContext.tsx
Manages QuizQuestion[] and methods:

.totalQuestions(ch?)

.question(ch, index)

.setUserAnswer(id, idx)

.isAnsweredCorrectly(id)

.totalCorrectAnswers()

.incorrectlyAnsweredQuestions()

Hook: useQuizService()

useHomeViewModel.ts
Mirrors Swift's HomeViewModel

Exposes currentCar and (formerly) a show-tour flag (now handled via navigation)

## 5. UI Components & Styling

Theming
ThemeProvider from React Navigation for light/dark themes

Safe Area
react-native-safe-area-context's SafeAreaView / useSafeAreaInsets()

Shared Constants
colors.ts, spacing.ts, types.ts

Quick-Tour

<QuickTourCard /> (self-navigating)

<QuickTourView /> (PagerView + nav + progress)

QuickTourPage*.tsx per chapter

<StepProgressBar />

Quiz

<QuizScreen /> (Test vs. Fahrpunkte tabs)

<CustomProgressBar /> (linear)

<FahrpunkteScreen /> (circular gauge)

<QuestionScreen /> (PagerView + “Bestätigen” + feedback overlay)

Helpers
<AssistantButton />, <TextWithSidebar />, <PlaceholderImage />, etc.

##  6. How It All Runs

App Launch
app/_layout.tsx loads fonts, wraps in providers, sets theme, instantiates <Stack>.

Tabs Mount
(tabs) loads app/(tabs)/_layout.tsx, rendering Home, Quiz, Profile tabs.

Home Tab
<HomeScreen /> shows toolbar, car title, <QuickTourCard />, tutorial list, and a manual launch button.

Quiz Tab
<QuizScreen /> toggles between:

Test: linear progress + “Starten” launches quiz modal.

Fahrpunkte: circular gauge & events.

Profile Tab
<ProfileScreen /> lists bookmarks, deep-links into Quick-Tour.

Quick-Tour Modal
/quick-tour/[chapter]?showOverlay=true → <QuickTourView />: swipeable pages, nav, step bar, back/next.

Quiz Modal
/quiz/[chapter]?onlyChapter=true|false → <QuestionScreen />: swipeable questions, confirm button, feedback overlay, then finish alert.