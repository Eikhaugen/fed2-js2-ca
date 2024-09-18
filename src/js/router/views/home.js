import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read"; 

const postsContainer = document.getElementById("posts-container");

authGuard();

/**
 * Fetches posts data from the API and renders them into the DOM.
 * 
 * The function fetches posts using the `readPosts` function and iterates 
 * over each post to dynamically create and inject HTML content for each 
 * post into the `postsContainer`. If an error occurs during the fetch 
 * operation, it logs the error to the console.
 *
 * @async
 * @function renderPosts
 * @returns {Promise<void>}
 */
async function renderPosts() {
  try {
    const response = await readPosts();

    const posts = response.data;

    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postMedia = post.media 
        ? `<img class="post-img" src="${post.media.url}" alt="${post.media.alt}">` 
        : ''; 

      postsContainer.innerHTML += `
        <a href="/post/index.html?postID=${post.id}" class="post" data-postID="${post.id}">
          ${postMedia}
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </a>
      `;
    });

  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}

renderPosts();
