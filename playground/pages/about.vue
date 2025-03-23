<template>
  <div class="about-page">
    <h1>About Us</h1>
    <div class="content">
      <p>Welcome to our amazing project! We're a passionate team dedicated to building great software.</p>

      <section class="mission">
        <h2>Our Mission</h2>
        <p>To create innovative solutions that make developers' lives easier and more productive.</p>
      </section>

      <section class="team">
        <h2>The Team</h2>
        <div class="team-members">
          <div class="member">
            <h3>Jane Doe</h3>
            <p>Lead Developer</p>
          </div>
          <div class="member">
            <h3>John Smith</h3>
            <p>UX Designer</p>
          </div>
        </div>
      </section>

      <div>
        <button @click="throwError">
          Throw Error
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page component logic can go here

function throwError() {
  throw new Error('This is a test error')
}
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.content {
  line-height: 1.6;
}

section {
  margin: 2rem 0;
}

h2 {
  color: #34495e;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.member {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.member h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}
</style>
