<template>
  <div class="home-page">
    <header class="hero">
      <h1>Welcome to Our Platform</h1>
      <p class="subtitle">
        Discover amazing features and possibilities
      </p>
    </header>

    <main class="main-content">
      <section class="features">
        <h2>What We Offer</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Easy Integration</h3>
            <p>Seamlessly connect with your favorite tools</p>
          </div>
          <div class="feature-card">
            <h3>Fast Performance</h3>
            <p>Optimized for speed and efficiency</p>
          </div>
          <div class="feature-card">
            <h3>Secure Platform</h3>
            <p>Your data is safe with us</p>
          </div>
        </div>
      </section>

      <section class="cta">
        <h2>Ready to Get Started?</h2>
        <button class="cta-button">
          Try it Now
        </button>
      </section>
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #42b883 0%, #347474 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.features {
  margin-bottom: 4rem;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.cta {
  text-align: center;
  padding: 4rem 0;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #3aa876;
}
</style>
