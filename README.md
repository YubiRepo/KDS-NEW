# KDS & CHECKER NEW

![Checker](https://github.com/user-attachments/assets/b571da47-ca11-4c5c-b2ba-2e1808c7404b)

![Table](https://github.com/user-attachments/assets/7a6da9a2-3cfe-48d8-9077-101540161592)

![KDS](https://github.com/user-attachments/assets/a6430fd4-da92-4363-91f4-a185b76696e6)


## Table of contents
1. [Requirements](#requirements)
2. [What's inside?](#what-inside) 
3. [Setup](#setup)
4. [Production Setup](#production-setup)

## Requirements

[NodeJS v20.x](https://nodejs.org/en)

<h2 id="what-inside">What's inside?</h2>

1. [Vue v3.x](https://vuejs.org/)
2. [Pinia v1.x](https://pinia.vuejs.org/)
3. [Bootstrap v5.x](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
4. [Axios v1.x](https://axios-http.com/docs/intro)

## Setup
1. Clone the repository

  ```sh
  git clone https://github.com/YubiRepo/KDS-NEW.git
  ```
2. CD into `KDS-NEW`
 
  ```sh
  cd KDS-NEW
  ```

3. Install the dependencies

  ```sh
  npm i
  ```

4. Copy `.env.example`

  ```sh
  cp .env.example .env
  ```

5. Change with the API/Backend IP `VITE_API_URL` in `.env`

  ```env
  VITE_API_URL="http://192.168.1.55:8081"
  ```

6. Run local server

  ```sh
  npm run dev
  ```
   
<h2 id="production-setup">Production Setup</h2>

1. Build for production

```sh
npm run build
```

2. Testing the build (optional)
```sh
npm run preview
```

3. Copy all folder & files in `dist` directory into server

