<template>
    <div>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <style scoped>
  header {
    background-color: #42b983;
    color: white;
    padding: 1rem;
  }
  
  nav a {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
  }
  
  nav a.router-link-active {
    font-weight: bold;
  }
  </style>
  