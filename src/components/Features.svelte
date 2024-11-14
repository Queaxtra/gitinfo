<script>
    const features = [
        { title: 'Quick User Lookup', description: 'Easily find GitHub users by entering their username.' },
        { title: 'Free Profile Access', description: 'Access user profiles without any cost.' },
        { title: 'Instant Results', description: 'Get user information instantly with no waiting time.' }
    ];
</script>

<div class="px-4 md:px-10 lg:px-48 py-10">
    <h2 class="text-3xl font-bold mb-2"># Features</h2>
    <p class="opacity-70 mb-4">Discover the power of GitInfo with these features:</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each features as feature}
        <div class="bg-white border border-backgroundDark hover:border-black transition-all duration-300 rounded p-4 text-center">
            <h3 class="text-lg font-bold mb-2">{feature.title}</h3>
            <p class="opacity-70">{feature.description}</p>
        </div>
        {/each}
    </div>
</div>