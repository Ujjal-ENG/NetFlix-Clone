import React, { useEffect } from "react";
import "./Home.scss";

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "849d1235b4f690bf48039d1e3bff9f5c";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card img={`${imgUrl}/${item.poster_path}`} key={index} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [nowPlaying, setnowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, settopRated] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/upcoming?api_key=${apiKey}`);
      setupcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/now_playing?api_key=${apiKey}`);
      setnowPlaying(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/popular?api_key=${apiKey}`);
      setPopular(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
      settopRated(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      setGenre(genres);
      console.log(genres);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popular[0]
            ? `url(${imgUrl}/${popular[0].poster_path})`
            : "rgb(16,16,16)",
        }}
      >
        {popular[0] && <h1>{popular[0].original_title}</h1>}
        {popular[0] && <p>{popular[0].overview}</p>}

        <div>
          <button>
            Play <BiPlay />
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title="Now Playing" arr={nowPlaying} />
      <Row title="Popular" arr={popular} />
      <Row title="Top Rated" arr={topRated} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={Math.random()} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
