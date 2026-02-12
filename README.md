### Frontend Developer Coding Challenge: Online Pharmacy

#### Objective
Create a simplified online pharmacy web application using TypeScript and React. The application should allow users to browse a list of medications, with the ability to filter by name, description, and manufacturer, and sort by price in ascending or descending order. This challenge will also test your ability to reduce scope, document your code, and write tests. Additionally, you need to provide a Node.js server to serve the frontend application.

#### Requirements
1. **Frontend Application**: Create a React application using TypeScript.
2. **Medications List**: Display a list of medications fetched from a provided file `products.json`.
3. **Filters**: Implement filters for name, description, and manufacturer.
4. **Sorting**: Allow sorting of medications by price in ascending and descending order.
5. **Documentation**: Document your code and explain your decisions.
6. **Testing**: Provide unit tests for your components and integration tests for the application.
7. **Node.js Server**: Implement a basic Node.js server to serve the frontend application.

#### Guidelines

1. **Setup**
   - Initialize a new React project using Create React App with TypeScript template.
   - Set up ESLint and Prettier for code quality and formatting.

2. **Medications List**
   - Create a mock API that returns a list of medications with details (name, description, price, manufacturer).
   - Display the list of medications with their name, price, and manufacturer.

3. **Filters**
   - Implement filters to allow users to search medications by name, description, and manufacturer.
   - Ensure that multiple filters can be applied simultaneously.

4. **Sorting**
   - Provide sorting functionality to order medications by price in both ascending and descending order.

5. **Node.js Server**
   - Create a simple Node.js server using Express to serve the frontend application.
   - Ensure the server handles serving static files and any necessary API routes.

6. **Documentation**
   - Write clear and concise documentation for your code, explaining your design choices and how to set up and run the application.
   - Include comments in your code where necessary to explain complex logic.

7. **Testing**
   - Write unit tests for your React components using a testing library like Jest and React Testing Library.
   - Include integration tests to ensure the main functionalities (like filtering and sorting) work as expected.

#### Deliverables
1. A GitHub repository (or any version control system you prefer) with the complete source code.
2. A README file containing:
   - Project description.
   - Setup instructions.
   - Usage instructions.
   - Documentation of the code.
3. Tests directory with all your test files.
4. A running Node.js server that serves the React application.

#### Submission
- Provide the link to your repository.
- Ensure the repository is public or provide access to the review team.

#### Evaluation Criteria
- Code quality and adherence to best practices.
- Ability to implement the required features.
- Quality and coverage of tests.
- Documentation clarity and completeness.
- The functionality and usability of the application.
- Ability to reduce scope and focus on core functionalities.

### How We Review

Your submission will be evaluated based on several criteria to ensure a comprehensive assessment of your skills and abilities. Below is an outline of the key aspects we will review:

1. **Code Quality**
   - **Readability**: Code should be clean, well-organized, and easy to read. Use meaningful variable and function names.
   - **Modularity**: Proper use of components and separation of concerns. Each component should have a single responsibility.
   - **Consistency**: Consistent coding style, adhering to the chosen conventions (e.g., ESLint and Prettier rules).

2. **Feature Implementation**
   - **Completeness**: All required features (medications list, filters, sorting) may be implemented. You decide what to deliver during the granted time frame. In case you reduce scope, please document in your readme.
   - **Functionality**: Features should work as expected without bugs. The application should be fully functional.
   - **Scope Management**: Demonstrated ability to focus on core functionalities and manage scope effectively.

3. **Documentation**
   - **Clarity**: Documentation should be clear and concise, explaining the purpose and usage of the code.
   - **Setup Instructions**: Clear instructions on how to set up and run the application.
   - **Code Comments**: Use comments to explain complex logic and decisions.

4. **Testing**
   - **Coverage**: Adequate coverage of unit tests for components and integration tests for the application.
   - **Quality**: Tests should be well-written, meaningful, and properly organized.
   - **Reliability**: Tests should run successfully and consistently.

5. **Node.js Server**
   - **Implementation**: A basic but functional Node.js server serving the frontend application.
   - **API Handling**: Proper handling of API routes and static files.
   - **Performance**: Server should be efficient and handle requests appropriately.

6. **User Experience**
   - **Usability**: The application should be user-friendly and intuitive.
   - **Design**: While not the primary focus, a clean and simple design will be appreciated.
   - **Responsiveness**: The application should work well on different screen sizes and devices.

### Example Project Structure
```
online-pharmacy/
├── public/
├── src/
│   ├── components/
│   │   ├── MedicationsList.tsx
│   │   ├── Filters.tsx
│   │   ├── Sort.tsx
│   ├── services/
│   │   ├── api.ts
│   ├── tests/
│   │   ├── MedicationsList.test.tsx
│   │   ├── Filters.test.tsx
│   │   ├── Sort.test.tsx
│   ├── App.tsx
│   ├── index.tsx
├── server/
│   ├── server.ts
├── README.md
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── .prettierrc
```

#### Notes
- Feel free to use any UI library like Material-UI or Bootstrap if needed.
- Keep the UI clean and simple.
- Focus on functionality over styling, but ensure the application is visually usable.

By following this structured review process, we aim to ensure a fair and comprehensive evaluation of your skills as a frontend developer. We look forward to reviewing your submission and seeing how you approach this challenge!