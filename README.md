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
├── app/                           ← File-based routing “source of truth”
│   ├── _layout.tsx                ← Global layout (fonts, theme, root Stack)
│   └── (tabs)/                    ← A route-group for bottom tabs (doesn’t appear in URL)
│       ├── _layout.tsx            ← Tabs layout (Home, Quiz, Profile)
│       ├── index.tsx              ← Home route
│       ├── quiz.tsx               ← Quiz route
│       └── profile.tsx            ← Profile route
│
├── components/                    ← All reusable UI components & screens
│   ├── HomeScreen.tsx             ← Full-page Home wrapper
│   ├── HomeToolbar.tsx            ← Top search/bookmark bar
│   ├── QuickTourCard.tsx          ← Pink “Tutorial starten” card
│   ├── HomeSection.tsx            ← Tutorial list + progress bar
│   ├── QuickTourView.tsx          ← Paged Quick-Tour carousel + nav + actions
│   ├── QuickTourPage*.tsx         ← One file per chapter page (ACC, ActivateDA, etc.)
│   ├── StepProgressBar.tsx        ← Top progress indicator for Quick-Tour
│   ├── TextWithSidebar.tsx        ← Helper for sidebar-style annotated text
│   ├── PlaceholderImage.tsx       ← Stub for animated GIFs in tour pages
│   ├── QuizScreen.tsx             ← Wrapper for “Test” vs “Fahrpunkte” tabs
│   ├── FahrpunkteScreen.tsx       ← “Fahrpunkte” score & events view
│   ├── QuestionScreen.tsx         ← Dynamic quiz question modal
│   ├── CustomProgressBar.tsx      ← Linear progress bar (Home tutorial)
│   ├── GaugeProgress.tsx          ← Circular progress (Fahrpunkte)
│   └── AssistantButton.tsx        ← Row button for each chapter (tutorial or quiz)
│
├── context/                       ← React Contexts for global stores
│   ├── ProfileContext.tsx        ← Port of Swift’s ProfileStore
│   └── QuizServiceContext.tsx    ← Port of Swift’s QuizService
│
├── hooks/                         ← Custom hooks for view-model logic
│   └── useHomeViewModel.ts       ← Port of Swift’s HomeViewModel
│
├── assets/                       ←Media files
│
├── constants/                     ← Shared constants, colors, types
│   ├── colors.ts
│   ├── spacing.ts
│   └── types.ts                  ← CarModel, `enum TourChapter`, `allChapters[]`
│
└── app.json / tsconfig.json      ← Expo config, path aliases (`@/` → project-root)


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

Holds user’s finished chapters, bookmarks, and profile code

Provides useProfile() hook to check .isChapterFinished(), .markChapterFinished(), etc.

QuizServiceContext.tsx

Manages quiz questions, user answers, correctness checks

Provides useQuizService() for fetching questions, setting answers, computing progress

useHomeViewModel.ts

Simple hook mirroring HomeViewModel.swift

Exposes currentCar and showQuickTour state

## 5. UI Components & Styling

Theming & Safe Area

We use ThemeProvider from React Navigation for light/dark themes

react-native-safe-area-context’s SafeAreaView or useSafeAreaInsets() ensures content sits below notches/status-bar

Shared Constants

colors.ts and spacing.ts let you update your palette or paddings in one place

types.ts defines enum TourChapter (one value per Swift TourChapter) and allChapters[] in the same order as pages

Reusable Widgets

AssistantButton: chapter rows used in tutorial & quiz

CustomProgressBar & GaugeProgress: match your SwiftUI progress styles

StepProgressBar: top indicator for Quick-Tour steps

TextWithSidebar & PlaceholderImage: helpers to style tour content

##  6. How It All Runs

App launch

app/_layout.tsx loads fonts, theme, wraps in contexts, instantiates root <Stack>

Tabs mount

The first screen (tabs) loads app/(tabs)/_layout.tsx, rendering bottom tabs

Home tab

app/(tabs)/index.tsx → <HomeScreen />:

Renders toolbar, header, QuickTourCard, HomeSection, and test buttons

Uses useRouter() to navigate into tour or quiz modals

Quiz tab

<QuizScreen /> toggles between Test and Fahrpunkte views, with chapter buttons that open <QuestionScreen /> as a modal route

Profile tab

<ProfileScreen /> shows user info and bookmarked chapters, pushes into QuickTour when a row is tapped

QuickTour modal

/quick-tour/[chapter] route → <QuickTourView />: swipeable pages (PagerView), custom nav bar, step indicator, previous/next buttons

Question modal

/quiz/[chapter]?onlyChapter= → <QuestionScreen />: paged quiz questions with feedback overlays

