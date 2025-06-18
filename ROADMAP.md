# Optimized Roadmap

This roadmap is designed to maximize progress with minimal blockers, prioritize quick wins, and ensure visible progress. All API interactions should use a mocked API Service Layer (no backend required at this stage).

| Priority | Feature                        | Task Description                                                                 | Complexity (Story Points) |
|----------|--------------------------------|----------------------------------------------------------------------------------|--------------------------|
| 1        | Pipeline Template Management   | Create new pipeline template (UI + mock API)                                     | 2                        |
| 2        | Pipeline Template Management   | List pipeline templates (UI + mock API)                                          | 1                        |
| 3        | Pipeline Template Management   | View pipeline template detail (UI + mock API)                                    | 1                        |
| 4        | Pipeline Template Management   | Update pipeline template (UI + mock API)                                         | 2                        |
| 5        | Pipeline Template Management   | Delete pipeline template (UI + mock API)                                         | 1                        |
| 6        | Pre-Built Stages               | Create pre-built stage (UI + mock API)                                           | 2                        |
| 7        | Pre-Built Stages               | List pre-built stages (UI + mock API)                                            | 1                        |
| 8        | Pre-Built Stages               | View detail of pre-built stage (UI + mock API)                                   | 1                        |
| 9        | Pre-Built Stages               | Update pre-built stage (UI + mock API)                                           | 2                        |
| 10       | Pre-Built Stages               | Delete pre-built stage (UI + mock API)                                           | 1                        |
| 11       | Pre-Built Tasks                | Create pre-built task (UI + mock API)                                            | 2                        |
| 12       | Pre-Built Tasks                | List pre-built tasks (UI + mock API)                                             | 1                        |
| 13       | Pre-Built Tasks                | View detail of pre-built task (UI + mock API)                                    | 1                        |
| 14       | Pre-Built Tasks                | Update pre-built task (UI + mock API)                                            | 2                        |
| 15       | Pre-Built Tasks                | Delete pre-built task (UI + mock API)                                            | 1                        |
| 16       | Pre-Built Jobs                 | Create pre-built job (UI + mock API)                                             | 2                        |
| 17       | Pre-Built Jobs                 | List pre-built jobs (UI + mock API)                                              | 1                        |
| 18       | Pre-Built Jobs                 | View detail of pre-built job (UI + mock API)                                     | 1                        |
| 19       | Pre-Built Jobs                 | Update pre-built job (UI + mock API)                                             | 2                        |
| 20       | Pre-Built Jobs                 | Delete pre-built job (UI + mock API)                                             | 1                        |
| 21       | Customization of Stages        | Edit metadata for stages (UI + mock API)                                         | 2                        |
| 22       | Customization of Tasks         | Edit metadata for tasks (UI + mock API)                                          | 2                        |
| 23       | Customization of Jobs          | Edit metadata for jobs (UI + mock API)                                           | 2                        |
| 24       | Service Connections            | Add new service connection (UI + mock API)                                       | 2                        |
| 25       | Service Connections            | List service connections (UI + mock API)                                         | 1                        |
| 26       | Service Connections            | Update service connection (UI + mock API)                                        | 2                        |
| 27       | Service Connections            | Delete service connection (UI + mock API)                                        | 1                        |
| 28       | Service Connections            | Link service connections to pipelines/stages (UI + mock API)                     | 2                        |
| 29       | Pipeline Editor (React Flow)   | Integrate React Flow for visual pipeline editing                                 | 3                        |
| 30       | Pipeline Editor (React Flow)   | Add drag-and-drop for stages/tasks/jobs                                          | 2                        |
| 31       | Pipeline Editor (React Flow)   | Visual feedback for connections and errors                                       | 2                        |
| 32       | Material UI Integration        | Use Material UI for all forms, lists, and dialogs                                | 2                        |
| 33       | Responsive Design & Themes     | Implement responsive layout (tablet minimum)                                     | 2                        |
| 34       | Responsive Design & Themes     | Add theme support (light/dark)                                                   | 2                        |
| 35       | Export Functionality           | Export pipeline as JSON (frontend only)                                          | 2                        |
| 36       | Export Functionality           | Export pipeline as YAML (send request to mock API for Azure/GitHub/Bitbucket)    | 2                        |
| 37       | About Page                     | Create About component (version, date, contributors)                             | 1                        |
| 38       | Contributors Page              | Fetch and display contributors list (mock API or static)                         | 1                        |
| 39       | Authentication                 | Integrate authentication UI with Microsoft provider (mocked)                     | 2                        |
| 40       | Authentication                 | Integrate authentication UI with Google provider (mocked)                        | 2                        |
| 41       | Authentication                 | Integrate authentication UI with GitHub provider (mocked)                        | 2                        |
| 42       | Authentication                 | Add authentication state management and user context                              | 2                        |
| 43       | Authentication                 | Protect routes and features based on authentication state                         | 2                        |
| 44       | Roles & Permissions            | Define roles and permissions matrix                                              | 1                        |
| 45       | Roles & Permissions            | Enforce permissions in UI (show/hide actions)                                    | 2                        |
| 46       | Globalization & i18n           | Integrate i18n library (e.g., react-i18next) and set up language resource files  | 2                        |
| 47       | Globalization & i18n           | Implement language switcher and provide at least two languages                   | 2                        |
| 48       | Globalization & i18n           | Refactor UI components to use translation keys                                   | 2                        |

---

### Notes

- **Quick Wins:**  
  Start with create/list/detail for templates and pre-built items for fast visual feedback.
- **Visual Progress:**  
  Integrate React Flow and Material UI early for visible UI improvements.
- **No Backend:**  
  All API calls should be mocked in the API Service Layer.
- **Complexity:**  
  Any task over 3 story points is split into smaller, independent tasks.
- **Testing:**  
  Each feature should include unit tests where possible.

---