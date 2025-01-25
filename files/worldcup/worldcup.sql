--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE worldcup;
--
-- Name: worldcup; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE worldcup WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE worldcup OWNER TO freecodecamp;

\connect worldcup

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    year integer NOT NULL,
    round character varying(50) NOT NULL,
    winner_goals integer NOT NULL,
    opponent_goals integer NOT NULL,
    winner_id integer NOT NULL,
    opponent_id integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.teams (
    team_id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.teams OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_team_id_seq OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (163, 2018, 'Final', 4, 2, 353, 354);
INSERT INTO public.games VALUES (164, 2018, 'Third Place', 2, 0, 355, 356);
INSERT INTO public.games VALUES (165, 2018, 'Semi-Final', 2, 1, 354, 356);
INSERT INTO public.games VALUES (166, 2018, 'Semi-Final', 1, 0, 353, 355);
INSERT INTO public.games VALUES (167, 2018, 'Quarter-Final', 3, 2, 354, 357);
INSERT INTO public.games VALUES (168, 2018, 'Quarter-Final', 2, 0, 356, 358);
INSERT INTO public.games VALUES (169, 2018, 'Quarter-Final', 2, 1, 355, 359);
INSERT INTO public.games VALUES (170, 2018, 'Quarter-Final', 2, 0, 353, 360);
INSERT INTO public.games VALUES (171, 2018, 'Eighth-Final', 2, 1, 356, 361);
INSERT INTO public.games VALUES (172, 2018, 'Eighth-Final', 1, 0, 358, 362);
INSERT INTO public.games VALUES (173, 2018, 'Eighth-Final', 3, 2, 355, 363);
INSERT INTO public.games VALUES (174, 2018, 'Eighth-Final', 2, 0, 359, 364);
INSERT INTO public.games VALUES (175, 2018, 'Eighth-Final', 2, 1, 354, 365);
INSERT INTO public.games VALUES (176, 2018, 'Eighth-Final', 2, 1, 357, 366);
INSERT INTO public.games VALUES (177, 2018, 'Eighth-Final', 2, 1, 360, 367);
INSERT INTO public.games VALUES (178, 2018, 'Eighth-Final', 4, 3, 353, 368);
INSERT INTO public.games VALUES (179, 2014, 'Final', 1, 0, 369, 368);
INSERT INTO public.games VALUES (180, 2014, 'Third Place', 3, 0, 370, 359);
INSERT INTO public.games VALUES (181, 2014, 'Semi-Final', 1, 0, 368, 370);
INSERT INTO public.games VALUES (182, 2014, 'Semi-Final', 7, 1, 369, 359);
INSERT INTO public.games VALUES (183, 2014, 'Quarter-Final', 1, 0, 370, 371);
INSERT INTO public.games VALUES (184, 2014, 'Quarter-Final', 1, 0, 368, 355);
INSERT INTO public.games VALUES (185, 2014, 'Quarter-Final', 2, 1, 359, 361);
INSERT INTO public.games VALUES (186, 2014, 'Quarter-Final', 1, 0, 369, 353);
INSERT INTO public.games VALUES (187, 2014, 'Eighth-Final', 2, 1, 359, 372);
INSERT INTO public.games VALUES (188, 2014, 'Eighth-Final', 2, 0, 361, 360);
INSERT INTO public.games VALUES (189, 2014, 'Eighth-Final', 2, 0, 353, 373);
INSERT INTO public.games VALUES (190, 2014, 'Eighth-Final', 2, 1, 369, 374);
INSERT INTO public.games VALUES (191, 2014, 'Eighth-Final', 2, 1, 370, 364);
INSERT INTO public.games VALUES (192, 2014, 'Eighth-Final', 2, 1, 371, 375);
INSERT INTO public.games VALUES (193, 2014, 'Eighth-Final', 1, 0, 368, 362);
INSERT INTO public.games VALUES (194, 2014, 'Eighth-Final', 2, 1, 355, 376);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.teams VALUES (353, 'France');
INSERT INTO public.teams VALUES (354, 'Croatia');
INSERT INTO public.teams VALUES (355, 'Belgium');
INSERT INTO public.teams VALUES (356, 'England');
INSERT INTO public.teams VALUES (357, 'Russia');
INSERT INTO public.teams VALUES (358, 'Sweden');
INSERT INTO public.teams VALUES (359, 'Brazil');
INSERT INTO public.teams VALUES (360, 'Uruguay');
INSERT INTO public.teams VALUES (361, 'Colombia');
INSERT INTO public.teams VALUES (362, 'Switzerland');
INSERT INTO public.teams VALUES (363, 'Japan');
INSERT INTO public.teams VALUES (364, 'Mexico');
INSERT INTO public.teams VALUES (365, 'Denmark');
INSERT INTO public.teams VALUES (366, 'Spain');
INSERT INTO public.teams VALUES (367, 'Portugal');
INSERT INTO public.teams VALUES (368, 'Argentina');
INSERT INTO public.teams VALUES (369, 'Germany');
INSERT INTO public.teams VALUES (370, 'Netherlands');
INSERT INTO public.teams VALUES (371, 'Costa Rica');
INSERT INTO public.teams VALUES (372, 'Chile');
INSERT INTO public.teams VALUES (373, 'Nigeria');
INSERT INTO public.teams VALUES (374, 'Algeria');
INSERT INTO public.teams VALUES (375, 'Greece');
INSERT INTO public.teams VALUES (376, 'United States');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 194, true);


--
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 376, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: games games_opponent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_opponent_id_fkey FOREIGN KEY (opponent_id) REFERENCES public.teams(team_id);


--
-- Name: games games_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(team_id);


--
-- PostgreSQL database dump complete
--

