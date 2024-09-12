# PaccurateViz

## Overview

PaccurateViz is a NextJS web application that provides a user-friendly interface for the Paccurate API. It allows users to efficiently manage box types, items, and packing rules for optimized cartonization and shipping cost reduction. The application is designed with a focus on usability, extensibility, and performance.

## Key Features

- Dynamic item management with real-time updates
- Customizable box type creation and selection, including predefined and custom options
- Flexible rule system for defining complex packing constraints
- Real-time packing visualization and cost estimation
- Seamless integration with Paccurate API for optimized packing solutions
- Multi-step guided process for creating a complete packing configuration

## Architecture and Design Decisions

### State Management

I chose Zustand for state management due to its simplicity, efficiency, and minimal boilerplate. This decision offers several advantages:

- **Centralized State**: Maintains selected data throughout each step of the creation process in a single store.
- **Simplified Updates**: Allows for easy state updates using simple setter functions.
- **Performance**: Provides better performance compared to more complex state management solutions like Redux, especially for this scale of application.

Implementation details:
- The `paccurateStore.ts` file contains all the state logic, including actions for adding, updating, and removing items, box types, and rules.
- Custom hooks like `usePaccurateStore` are used throughout the application to access and modify the state, promoting a consistent state management pattern.

### Component Structure

The application is built using a modular component structure, separating concerns for better maintainability and scalability:

- `ItemSet`: Manages the creation and listing of items.
- `BoxTypeSet`: Handles custom box type creation and management.
- `RuleDisplay`: Allows for the creation and management of packing rules.
- `PaccurateStepper`: Guides users through the packing process.

This structure enables:
- Easy expansion and modification of individual features without affecting the entire application.
- Clear separation of concerns, making the codebase more maintainable.
- Reusability of components across different parts of the application.

### Form Handling

I implemented form validation using Yup and react-hook-form to ensure data integrity and provide a smooth user experience. This combination offers:

- **Declarative Schema Validation**: Yup allows for clear, readable schema definitions.
- **Efficient Form State Management**: react-hook-form provides performant form handling with minimal re-renders.
- **Customizable Error Messages**: Easily define and display user-friendly error messages.
- **TypeScript Integration**: Strong typing support for form values and validation schemas.

Implementation examples:
- `ItemForm.tsx` and `BoxTypeForm.tsx` utilize this combination for robust form handling and validation.

### API Integration

The application integrates with the Paccurate API through a serverless function, allowing for:

- **Secure API Key Management**: The API key is stored server-side, preventing exposure in client-side code.
- **Reduced Client-Side Complexity**: The serverless function handles API requests, simplifying the client-side code.
- **Easy Deployment**: Seamless deployment on platforms like Vercel that support serverless functions.
- **Scalability**: The serverless architecture allows for easy scaling as the application grows.

Implementation details:
- The `route.ts` file in the `api` directory contains the serverless function for handling Paccurate API requests.

### UI Design

I utilized Chakra UI for its:

- **Accessible Components**: Pre-built components that adhere to WAI-ARIA standards.
- **Customizable Theming**: Easy customization of colors, fonts, and component styles.
- **Responsive Design**: Built-in responsive styles and utilities for creating mobile-friendly layouts.
- **Consistent Styling**: Ensures a uniform look and feel across the application.

Implementation examples:
- Components like `RuleCard.tsx` and `BoxTypeCard.tsx` make extensive use of Chakra UI components for a polished look.

### Rule System

The rule system is designed to be extensible and user-friendly, featuring:

- **Variety of Rule Types**: Supports multiple rule types like exclude, lock-orientation, fragile, pack-as-is, and alternate dimensions.
- **Dynamic Rule Options**: Options for each rule type are dynamically generated based on the `ruleConfigs.ts` file.
- **Visual Representation**: Applied rules are visually represented in the UI for easy understanding.
- **Conflict Management**: The system prevents conflicting rules from being applied to the same item.

Implementation details:
- The `ruleConfigs.ts` file contains the configuration for all rule types, making it easy to add or modify rules.
- The `RuleEditor.tsx` component dynamically renders rule options based on the selected rule type.


## Future Enhancements

- Implement responsive design for better mobile and tablet support.
- Add more rule types and support for complex rate tables.
- Enhance visualization of packing results with 3D rendering.
- Implement a user account system for saving and sharing packing configurations.
- Add unit and integration tests for improved code reliability.
- Optimize performance for handling large numbers of items and box types.
- Replace 'any' types with more specific types or interfaces
- Implement extensive error handling for API response

## Getting Started

### Try it Online

I recommend trying out the application via the published link: [PaccurateViz on Vercel](https://paccurate-viz.vercel.app)

This hosted version is always up-to-date and doesn't require any setup on your part. It's the quickest way to explore the application's features and functionality.

### Local Setup

If you prefer to run PaccurateViz locally, follow these steps:

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/paccurate-viz.git
   cd paccurate-viz
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Paccurate API key:
   ```
   PACCURATE_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```
   npm run dev
   ```

5. **Open the application**
   Navigate to `http://localhost:3000` in your web browser.

Note: Running the application locally requires Node.js (version 14 or later) and npm to be installed on your system.

