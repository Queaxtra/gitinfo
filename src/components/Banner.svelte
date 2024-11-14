<script lang="ts">
    import { fetchUser } from "$lib/fetch";
    import html2canvas from "html2canvas";

    let searchQuery = "";
    let data: any = null;
    let loading = false;

    async function handleSearch() {
        loading = true;
        data = await fetchUser(searchQuery).then(() => {
            loading = false;
        })
    }

    async function downloadProfileAsPng() {
        const element = document.getElementById("profile-card");
        if (element) {
            const images = element.querySelectorAll('img');
            await Promise.all(Array.from(images).map(img => new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            })));
            const canvas = await html2canvas(element, { useCORS: true });
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "profile.png";
            link.click();
        }
    }
</script>

<section class="py-20">
    <div class="container mx-auto text-center px-4 md:px-0">
        <h1 class="text-4xl md:text-5xl font-bold mt-10">Find All Users</h1>
        <p class="mt-3 text-lg font-light">Enter a GitHub username to preview and download their profile</p>
        <div class="mt-6">
            <input type="text" placeholder="Enter GitHub username" bind:value={searchQuery} class="border p-2 rounded w-full md:w-80 px-3 placeholder:text-black/20 focus:outline-black" on:keydown={e => e.key === "Enter" && handleSearch()} />
            {#if loading}
            <button disabled class="mt-2 w-full md:w-40 py-2 bg-black text-white rounded transition disabled:cursor-not-allowed disabled:opacity-20">Searching...</button>
            {:else}
            <button on:click={handleSearch} class="mt-2 w-full md:w-40 py-2 bg-black text-white rounded transition disabled:cursor-not-allowed disabled:opacity-20" disabled={!searchQuery}>Search</button>
            {/if}
        </div>

        {#if data}
        <div id="profile-card" class="mt-10 max-w-full md:max-w-xl border mx-auto rounded overflow-hidden bg-white shadow-md">
            <div class="flex flex-col items-center p-4">
                <img src={data.avatar_url} alt="User Avatar" class="w-16 h-16 rounded-full border-2" />
                <div class="mt-2 text-center">
                    <h2 class="text-xl font-semibold">{data.name}</h2>
                    <p class="opacity-75 text-sm">@{data.login}</p>
                </div>
                <div class="mt-4 w-full flex flex-wrap justify-around">
                    <div class="text-center mt-2">
                        <p class="font-bold text-2xl">{data.followers.toLocaleString()}</p>
                        <p class="text-sm opacity-60">Followers</p>
                    </div>
                    <div class="text-center mt-2">
                        <p class="font-bold text-2xl">{data.following.toLocaleString()}</p>
                        <p class="text-sm opacity-60">Following</p>
                    </div>
                    <div class="text-center mt-2">
                        <p class="font-bold text-2xl">{data.public_repos.toLocaleString()}</p>
                        <p class="text-sm opacity-60">Repos</p>
                    </div>
                </div>
                <div class="mt-4 text-start">
                    {#if data.company}
                    <p><i class="ri-building-line"></i> Company: <span class="opacity-80">{data.company}</span></p>
                    {/if}
                    {#if data.blog}
                    <p><i class="ri-globe-line"></i> Website: <a href={data.blog} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">{data.blog}</a></p>
                    {/if}
                    {#if data.location}
                    <p><i class="ri-map-pin-line"></i> Location: <span class="opacity-80">{data.location}</span></p>
                    {/if}
                    {#if data.bio}
                    <p><i class="ri-user-line"></i> Bio: <span class="opacity-80">{data.bio}</span></p>
                    {/if}
                    {#if data.twitter_username}
                    <p><i class="ri-twitter-x-line"></i> Twitter: <a href={`https://x.com/${data.twitter_username}`} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">@{data.twitter_username}</a></p>
                    {/if}
                </div>
            </div>
        </div>
        <button on:click={downloadProfileAsPng} class="mt-4 w-full md:w-96 py-2 bg-black text-white rounded">Download as PNG</button>
        {/if}
    </div>
</section>