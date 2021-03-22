# Spootify Coding Challenge 🎧

### Difficulty: Hard | Time required: ~ 60 minutes

# Notes
Check out [Spotify Auth | Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow) for the most up-to-date
method of auth'ing to the Spotify API.

# Goals/Outcomes ✨
- To test knowledge of consuming APIs and handling responses
- Loading state and knowing where and how to make multiple API calls efficiently

# Pre-requisites ✅
- Add your Spotify client ID & secret to `config.js`
  - Note. **Never add this type of config to version control. This would usually come from your build server.**

# Requirements 📖
- Fetch and display *Released This Week* songs - DONE
  - Use the API path `new-releases`
- Fetch and display *Featured Playlists* - DONE
  - Use the API path `featured-playlists`
- Fetch and display *Browse* genres - DONE
  - Use the API path `categories`
- Loading state/UI *(optional, current UX is already clean)*

# Think about 💡
- Taking a look at the Spotify API documentation
  - Necessary in order to learn about auth and shape of response data.
- Do you resolve each API request one after the other or in parallel?
  - in parallel
- Where do you make the API requests?
  - componentDidMount
- How much logic do you offload out of the UI components?
  - none of the logic is in the UI components
    - spotifyClient contains all the auth + request logic.
      - if this data was centralized in Redux, these lib fn's could just be moved into actions.
    - DiscoverContainer contains the knowledge of **when** and **how** the requests for data should be made.
    - as a result, the Discover component became a strictly UI component

# What's Already Been Done 🏁
- UI/UX for all elements, including previews (mobile responsive)

# Screenshots 🌄

![screenshot-desktop](https://puu.sh/GwPLE/3be580156a.png)
![screenshot-mobile](https://puu.sh/GwPLS/0bcb566d23.png)
