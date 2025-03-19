# Vite + React Frontend

This project is a minimal setup for React with Vite, providing Hot Module Replacement (HMR) and basic ESLint rules. It includes two official plugins for React integration:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

---

## Node.js Installation (Ubuntu)

To install Node.js on Ubuntu, we recommend using `nvm` (Node Version Manager) to handle multiple versions of Node.js easily.

### Steps:

1. **Install NVM:**
   
   Open your terminal and run:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

2. **Close and Reopen Terminal** or run:

   ```bash
   source ~/.bashrc
   ```

3. **Install Node.js Version 22.14.0:**

   ```bash
   nvm install 22.14.0
   ```

4. **Set Node.js Version:**

   After installation, set Node.js version 22.14.0 to be used by default:

   ```bash
   nvm use 22.14.0
   ```

5. **Verify Installation:**

   You can verify that Node.js and npm have been successfully installed by running:

   ```bash
   node -v
   npm -v
   ```

### For Other Operating Systems:

For installation instructions for other operating systems (macOS, Windows), follow the links below:

- [Installing NVM for macOS](https://github.com/nvm-sh/nvm#install--update-script)
- [Installing NVM for Windows](https://github.com/coreybutler/nvm-windows)


## Installation Guide

### 1. Clone the Repository

```bash
git clone <url>
cd trainee_frontend_reactjs
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory of the project with the following contents:

```plaintext
VITE_BACKENDURL=your_backend_url_here http://url:port/
```

Make sure to replace `your_backend_url_here` with your actual backend URL.

### 3. Install Dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install
```

Alternatively, you can use `yarn` if you prefer:

```bash
yarn install
```

### 4. Start Development Server

Start the development server using:

```bash
npm run dev
```

Or with `yarn`:

```bash
yarn run dev
```

### 5. Build the Project

To build the project for production:

```bash
npm run build
```

Or with `yarn`:

```bash
yarn build
```


