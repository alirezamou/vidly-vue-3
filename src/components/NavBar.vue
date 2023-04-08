<template>
  <nav class="navbar navbar-light navbar-expand bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Vidly</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/movies" class="nav-link">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/customers" class="nav-link">Customers</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rentals" class="nav-link">Rentals</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: "NavbarComponent",
}
</script>