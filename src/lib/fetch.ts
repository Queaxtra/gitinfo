export async function fetchUser(name: string) {
    const res = await fetch(`https://api.github.com/users/${name}`);
    const data = await res.json();
    return data;
}