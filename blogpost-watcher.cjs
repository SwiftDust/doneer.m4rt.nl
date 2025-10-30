const fs = require("fs");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BLOG_DIR = path.join(__dirname, "src", "blog");
const STATE_FILE = path.join(__dirname, "blogpost-watcher-state.json");
const API_URL = "https://listmonk.m4rt.nl/api/campaigns";

function getAllBlogPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(BLOG_DIR, f));
}

function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { sent: [] };
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function notifyNewPosts() {
  const state = loadState();
  const allPosts = getAllBlogPosts();
  const newPosts = allPosts.filter((f) => !state.sent.includes(f));

  // Get token from environment variables
  const token = process.env.TOKEN;
  if (!token) {
    console.error("TOKEN environment variable not set.");
    process.exit(1);
  }

  for (const post of newPosts) {
    const postName = path.basename(post);
    const postTitle = fs
      .readFileSync(post, "utf8")
      .split("\n")[0]
      .replace("# ", "")
      .trim();

    const payload = {
      name: postName,
      subject: `Nieuwe blogpost: ${postTitle}`,
      lists: [3],
      type: "regular",
      content_type: "html",
      body: `<h1>Er is een nieuwe actie online gekomen: ${postTitle}</h1><p>Lees hem nu en zie of jij kan helpen! https://m4rt.nl/blog/${postName.replace(".mdx", "")}<br>Groetjes, Mart :)<br><br>PS: dit bericht is automatisch gegenereerd. Maar als er iets belangrijks gebeurt, bijvoorbeeld een mijlpaal, zal ik je op de hoogte houden!</p>`,
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token api:${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.text();
      if (res.ok) {
        console.log(`Notified API about: ${postName}`);
        state.sent.push(post);
      } else {
        console.error(`Failed to notify for ${postName}:`, data);
      }
    } catch (err) {
      console.error(`Failed to notify for ${postName}:`, err.message);
    }
  }
  saveState(state);
}

notifyNewPosts();
