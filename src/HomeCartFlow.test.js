import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Home";
import Cart from "./components/Cart";




// Mock fetch before each test
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    // Mock AudioDB search response
    if (url.includes("searchalbum.php")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            album: [
              {
                idAlbum: "123",
                strAlbum: "Inception OST",
                strArtist: "Hans Zimmer",
                intYearReleased: "2010",
                strAlbumThumb: "https://via.placeholder.com/100",
              },
            ],
          }),
      });
    }

    // Mock Spotify token or search response
    if (url.includes("spotify.com")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            albums: {
              items: [
                {
                  id: "spotify123",
                  name: "Inception OST",
                  images: [{ url: "https://via.placeholder.com/200" }],
                  external_urls: { spotify: "https://open.spotify.com/album/spotify123" },
                },
              ],
            },
          }),
      });
    }

    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
});
test("remove from cart flow", async () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <Home />
        <Cart />
      </CartProvider>
    </BrowserRouter>
  );

  // Add an item first
  const input = screen.getByPlaceholderText("Enter movie title");
  fireEvent.change(input, { target: { value: "Inception" } });
  fireEvent.click(screen.getByText("Search Soundtracks"));
  await screen.findByText("Inception OST");
  fireEvent.click(await screen.findByText("Add to Cart"));
  await screen.findByText(/Total items: 1/i);

  // Remove the item
  fireEvent.click(await screen.findByText("Remove"));

  // Verify cart updates (empty cart message)
  expect(await screen.findByText(/No items in cart/i)).toBeInTheDocument();
});


test("search and add to cart flow", async () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <Home />
        <Cart />
      </CartProvider>
    </BrowserRouter>
  );

  // Type into search box
  const input = screen.getByPlaceholderText("Enter movie title");
  fireEvent.change(input, { target: { value: "Inception" } });

  // Click search
  const searchBtn = screen.getByText("Search Soundtracks");
  fireEvent.click(searchBtn);

  // Wait for mocked album to appear
  const albumTitle = await screen.findByText("Inception OST");
  expect(albumTitle).toBeInTheDocument();

  // Add to cart
  fireEvent.click(await screen.findByText("Add to Cart"));

  // Check cart summary updates
  expect(await screen.findByText(/Total items: 1/i)).toBeInTheDocument();

  // Check Spotify link exists
  const spotifyLink = await screen.findByText("Listen on Spotify");
  expect(spotifyLink).toHaveAttribute("href", "https://open.spotify.com/album/spotify123");
});
