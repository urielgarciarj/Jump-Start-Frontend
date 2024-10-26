<template>
    <div class="container">
        <div class="grid-item">
            <img src="@/assets/profile.png" class="image-profile" alt="Profile Image">
            <div class="text-center">
                <h5 class="card-title text-center">Uriel Garcia</h5>
                <h6 class="text-center text-muted">Founder</h6>
                <button type="button" class="btn btn-success">
                    Follow
                </button>
                <button type="button" class="btn btn-danger">
                    Message
                </button>
            </div>
            <div class="mt-4">
                <h3 class="">ABOUT ME :</h3>
                <p>
                    Hi I'm Tosha Minner,has been the industry's standard dummy text ever since the 1500s, when an
                    unknown
                    printer took a galley of type.
                </p>
                <div class="flex">
                    <strong>Full Name :</strong>
                    <span>Tosha K. Minner</span>
                </div>
                <div class="flex">
                    <strong>Mobile :</strong>
                    <span>(123) 123 1234</span>
                </div>
                <div class="flex">
                    <strong>Email :</strong>
                    <span>user@email.domain</span>
                </div>
                <div class="flex">
                    <strong>Location :</strong>
                    <span>USA</span>
                </div>
            </div>
        </div>
        <div class="grid-item">
            <div class="card">
                <h5 class="card-header">Projects</h5>
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </div>
        <div class="grid-item">
            <div class="card">
                <h5 class="card-header">Education</h5>
                <div class="card-body">
                    <h5 class="card-title">Universidad de Guadalajara</h5>
                    <p class="card-text">2009 - 2015</p>
                    <h5 class="card-title">Preparatoria 9 UdeG</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </div>
        <div class="grid-item">
            <div class="card">
                <h5 class="card-header">Experience</h5>
                <div class="card-body">
                    <h5 class="card-title">Universidad de Guadalajara</h5>
                    <p class="card-text">2009 - 2015</p>
                    <h5 class="card-title">Preparatoria 9 UdeG</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// No se necesita lógica adicional para este componente estático
</script>

<style>
.container {
    padding-top: 1%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.grid-item {
    background-color: #f0f0f0;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
}

/* Specific configuration for the elements in the first row */
.grid-item:nth-child(1) {
    grid-column: span 1;
    /* Item 1 takes just one column */
}

.grid-item:nth-child(2) {
    grid-column: span 2;
    /* Item 2 takes 2 columns */
}

.grid-item:nth-child(4) {
    grid-column: span 2;
    /* Item 2 takes 2 columns */
}

.image-profile {
    width: 50%;
    height: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>