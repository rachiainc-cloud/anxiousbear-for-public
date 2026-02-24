# AnxiousBear – State-Driven Mental Health Demo

A minimal, architecture-focused demo of **AnxiousBear**,  
a behavior-driven mental wellness app that transforms emotion into action.

This public repository showcases:

- State-based UX design
- Shared task state via custom hook
- AI → Action flow (mocked)
- Reflect → State → UI feedback loop

> This is a demo version for hackathon review.  
> Production backend (Supabase / AI edge functions) is replaced with mock logic.

---

## 🧠 Core Concept

AnxiousBear is built around one idea:

> Emotion should not stay abstract.  
> It should be converted into small, actionable steps.

The app has three key flows:

1. **Home** – Today’s tasks + anxiety visualization
2. **Chat** – AI mock that turns feelings into suggested actions
3. **Reflect** – 4-question state classifier that changes bear behavior

---

## 🏗 Architecture Overview

Reflect (Input)
↓
computeReflectResult()
↓
App-level reflectState
↓
Home UI reacts (Bear message changes)

Chat
↓
mockCallAssistant()
↓
Suggested Task
↓
Shared useTodayTasks hook
↓
Home Task List

### Key Patterns

### 1️⃣ Shared State Hook

`useTodayTasks()` acts as a lightweight global task store.

Both:
- `ChatScreen`
- `TodayScreen`

consume the same hook.

This keeps UI loosely coupled while sharing behavior.

---

### 2️⃣ Derived State Layer

`deriveHomeSummary()` computes:

- anxietyLevel
- bearOpacity
- blur intensity

UI never calculates state directly.

Instead:

```

Raw Tasks → Derived State → UI

```

This keeps logic centralized and testable.

---

### 3️⃣ Reflect → State → UI Feedback

Reflect screen collects:

- Energy
- Sleep
- Anxiety
- Control

Then:


answers → score → stateKey (GREEN / YELLOW / ORANGE / RED)



Home screen reacts to this state via:

- Bear message
- Tone of guidance



### 4️⃣ AI Boundary (Mocked)

In production:



Client → Edge Function → LLM



In this demo:



Client → mockCallAssistant()



This demonstrates architectural separation without exposing API keys.



## 🎨 UX Highlights

- Anxiety bar visually reflects task completion
- Bear blur intensity decreases as tasks complete
- Long-press to delete tasks
- AI suggestion editable before adding to Today
- Reflect result dynamically changes bear messaging

---

## 🚀 How to Run

```bash
npm install
npx expo start
````

---

## 📌 Design Philosophy

* Single source of truth for tasks
* Derived state instead of scattered calculations
* Emotion → Action conversion
* Minimal but extensible architecture

---

## ⚠️ Notes

* No backend is connected in this demo
* AI responses are mocked
* Tasks are stored in-memory (session only)

---

## 👩‍💻 Built With

* React Native (Expo)
* TypeScript
* Custom shared state hook
* Mock AI layer

---

## 🎯 Hackathon Focus

This repository demonstrates:

* State-driven UI architecture
* Clean separation between logic and presentation
* Shared behavior via custom hooks
* UX feedback loop based on emotional state


# 🧠 Architecture – One-Page Overview


                ┌──────────────────────┐
                │     Reflect Screen    │
                │  (4 Emotional Inputs) │
                └────────────┬──────────┘
                             ↓
                   computeReflectResult()
                             ↓
                    reflectState (App)
                             ↓
                ┌──────────────────────┐
                │      Home Screen      │
                │  Bear reacts to state │
                │  Anxiety bar updates  │
                └────────────┬──────────┘
                             ↑
        ┌────────────────────┴────────────────────┐
        │                                         │
        │             useTodayTasks()              │
        │       (Shared In-Memory Task Store)      │
        └────────────┬─────────────────────────────┘
                     ↑
                     │
          ┌──────────────────────┐
          │      Chat Screen      │
          │  mockCallAssistant()  │
          │  → Suggested Action   │
          │  → Add to Home        │
          └──────────────────────┘


### Flow Summary

Reflect → State Classification → Bear UI reacts  
Chat → AI Suggestion → Shared Task Hook → Home List  

No direct screen-to-screen coupling.  
All shared behavior flows through structured state layers.



## 🔄 State-Driven Design Principle

This demo is structured around a core idea:

> UI should react to state, not compute it.

- Reflect defines emotional state.
- Derived logic computes behavior.
- UI renders from derived state.
- Tasks are managed through a shared hook.

This ensures scalability and clear separation of concerns.




