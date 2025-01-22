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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(50) NOT NULL,
    discovered_by character varying(100),
    mean_diameter_km numeric(6,1),
    star_id integer
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    constellation character varying(30),
    distance_kpc numeric(15,3),
    type text
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    planet_id integer,
    log_mass_kg numeric(30,16),
    semi_major_axis_km integer,
    orbital_period_days numeric(15,2),
    inclination_deg numeric(5,2),
    eccentricity numeric(10,4),
    discovery_year integer,
    "group" text
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    star_id integer,
    mass numeric(10,2),
    semi_major_axis numeric(10,2),
    orbital_period numeric(10,2),
    inclination_to_suns_equator numeric(10,2),
    orbital_eccentricity numeric(5,3),
    rotation_period numeric(10,2),
    confirmed_moons integer,
    axial_tilt numeric(5,2),
    rings boolean,
    atmosphere text,
    equatorial_diameter numeric(10,3),
    is_inhabitable boolean
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    galaxy_id integer,
    age text,
    distance_from_sol_kpc numeric(15,3),
    spectral_class character varying(10),
    luminosity_class character varying(10)
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_id_seq OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'Ceres', 'Giuseppe Piazzi', 939.4, 1);
INSERT INTO public.asteroid VALUES (2, '4 Vesta', 'Heinrich Wilhelm Olbers', 525.4, 1);
INSERT INTO public.asteroid VALUES (3, '2 Pallas', 'Heinrich Wilhelm Olbers', 511.0, 1);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Sagittarius', 7.935, 'Sb; Sbc; SB(rs)bc');
INSERT INTO public.galaxy VALUES (2, 'Andromeda Galaxy', 'Andromeda', 765.000, 'SA(s)b');
INSERT INTO public.galaxy VALUES (3, 'Triangulum Galaxy', 'Triangulum', 970.000, 'SA(s)cd');
INSERT INTO public.galaxy VALUES (4, 'NGC 1232', 'Eridanus', 18700.000, 'SAB(rs)c');
INSERT INTO public.galaxy VALUES (5, 'Sombrero Galaxy', 'Virgo', 9550.000, 'SA(s)a');
INSERT INTO public.galaxy VALUES (6, 'Large Magellanic Cloud', 'Dorado/Mensa', 49.970, 'SB(s)m');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Metis', 5, 16.5563025007672984, 127690, 7.07, 0.06, 0.0000, 1979, 'Inner');
INSERT INTO public.moon VALUES (2, 'Adrastea', 5, 15.3010299956640008, 128690, 7.17, 0.03, 0.0015, 1979, 'Inner');
INSERT INTO public.moon VALUES (3, 'Amalthea', 5, 18.3180633349628010, 181366, 11.95, 0.37, 0.0032, 1892, 'Inner');
INSERT INTO public.moon VALUES (4, 'Thebe', 5, 17.6334684555795995, 221889, 16.16, 1.08, 0.0175, 1979, 'Inner');
INSERT INTO public.moon VALUES (5, 'Io', 5, 22.9509438521411013, 421700, 1.77, 0.05, 0.0041, 1610, 'Galilean');
INSERT INTO public.moon VALUES (6, 'Europa', 5, 22.6812412373755983, 671034, 3.55, 0.47, 0.0094, 1610, 'Galilean');
INSERT INTO public.moon VALUES (7, 'Ganymede', 5, 23.1708188980337013, 1070412, 7.15, 0.20, 0.0011, 1610, 'Galilean');
INSERT INTO public.moon VALUES (8, 'Callisto', 5, 23.0317719075139991, 1882709, 16.69, 0.20, 0.0074, 1610, 'Galilean');
INSERT INTO public.moon VALUES (9, 'Themisto', 5, 14.8388490907373001, 7393216, 129.87, 45.76, 0.2115, 1975, '*Themisto*');
INSERT INTO public.moon VALUES (10, 'Leda', 5, 15.7781512503835994, 11187781, 240.82, 27.56, 0.1673, 1974, 'Himalia');
INSERT INTO public.moon VALUES (11, 'Himalia', 5, 18.8260748027007985, 11451971, 250.23, 30.49, 0.1513, 1904, 'Himalia');
INSERT INTO public.moon VALUES (12, 'Lysithea', 5, 16.7993405494535999, 11740560, 259.89, 27.01, 0.1322, 1938, 'Himalia');
INSERT INTO public.moon VALUES (13, 'Elara', 5, 17.9395192526185987, 11778034, 257.62, 29.69, 0.1948, 1905, 'Himalia');
INSERT INTO public.moon VALUES (16, 'S/2003 J 12', 5, 13.0000000000000000, 17739539, -482.69, 142.68, 0.4449, 2003, '*?*');
INSERT INTO public.moon VALUES (14, 'S/2000 J 11', 5, 13.9542425094393003, 12570424, 287.93, 27.58, 0.2058, 2001, 'Himalia?');
INSERT INTO public.moon VALUES (15, 'Carpo', 5, 13.6020599913279998, 17144873, 458.62, 56.00, 0.2735, 2003, '*Carpo*');
INSERT INTO public.moon VALUES (17, 'Euporie', 5, 13.0000000000000000, 19088434, -538.78, 144.69, 0.0960, 2002, 'Ananke');
INSERT INTO public.moon VALUES (18, 'S/2003 J 3', 5, 13.0000000000000000, 19621780, -561.52, 146.36, 0.2507, 2003, 'Ananke');
INSERT INTO public.moon VALUES (19, 'S/2003 J 18', 5, 13.0000000000000000, 19812577, -569.73, 147.40, 0.1569, 2003, 'Ananke');
INSERT INTO public.moon VALUES (20, 'S/2011 J 1', 5, 13.0000000000000000, 20155290, -582.22, 162.80, 0.2963, 2011, '*?*');
INSERT INTO public.moon VALUES (21, 'S/2010 J 2', 5, 13.0000000000000000, 20307150, -588.36, 150.40, 0.3070, 2010, 'Ananke?');
INSERT INTO public.moon VALUES (22, 'Thelxinoe', 5, 13.0000000000000000, 20453753, -597.61, 151.29, 0.2684, 2003, 'Ananke');
INSERT INTO public.moon VALUES (23, 'Euanthe', 5, 13.6020599913279998, 20464854, -598.09, 143.41, 0.2000, 2002, 'Ananke');
INSERT INTO public.moon VALUES (24, 'Helike', 5, 13.9542425094393003, 20540266, -601.40, 154.59, 0.1374, 2003, 'Ananke');
INSERT INTO public.moon VALUES (25, 'Orthosie', 5, 13.0000000000000000, 20567971, -602.62, 142.37, 0.2433, 2002, 'Ananke');
INSERT INTO public.moon VALUES (26, 'Iocaste', 5, 14.2787536009528004, 20722566, -609.43, 147.25, 0.2874, 2001, 'Ananke');
INSERT INTO public.moon VALUES (27, 'S/2003 J 16', 5, 13.0000000000000000, 20743779, -610.36, 150.77, 0.3184, 2003, 'Ananke');
INSERT INTO public.moon VALUES (28, 'Praxidike', 5, 14.6334684555795995, 20823948, -613.90, 144.21, 0.1840, 2001, 'Ananke');
INSERT INTO public.moon VALUES (29, 'Harpalyke', 5, 14.0791812460476002, 21063814, -624.54, 147.22, 0.2440, 2001, 'Ananke');
INSERT INTO public.moon VALUES (30, 'Mneme', 5, 13.0000000000000000, 21129786, -627.48, 149.73, 0.3169, 2003, 'Ananke');
INSERT INTO public.moon VALUES (31, 'Hermippe', 5, 13.9542425094393003, 21182086, -629.81, 151.24, 0.2290, 2002, 'Ananke?');
INSERT INTO public.moon VALUES (32, 'Thyone', 5, 13.9542425094393003, 21405570, -639.80, 147.28, 0.2525, 2002, 'Ananke');
INSERT INTO public.moon VALUES (33, 'Ananke', 5, 16.4771212547197017, 21454952, -640.38, 151.56, 0.3445, 1951, 'Ananke');
INSERT INTO public.moon VALUES (34, 'Herse', 5, 13.0000000000000000, 22134306, -672.75, 162.49, 0.2379, 2003, 'Carme');
INSERT INTO public.moon VALUES (35, 'Aitne', 5, 13.6020599913279998, 22285161, -679.64, 165.56, 0.3927, 2002, 'Carme');
INSERT INTO public.moon VALUES (36, 'Kale', 5, 13.0000000000000000, 22409207, -685.32, 165.38, 0.2011, 2002, 'Carme');
INSERT INTO public.moon VALUES (37, 'Taygete', 5, 14.2041199826559001, 22438648, -686.67, 164.89, 0.3678, 2001, 'Carme');
INSERT INTO public.moon VALUES (38, 'S/2003 J 19', 5, 13.0000000000000000, 22709061, -699.12, 164.73, 0.1961, 2003, 'Carme');
INSERT INTO public.moon VALUES (39, 'Chaldene', 5, 13.8450980400142996, 22713444, -699.33, 167.07, 0.2916, 2001, 'Carme');
INSERT INTO public.moon VALUES (40, 'S/2003 J 15', 5, 13.0000000000000000, 22720999, -699.68, 141.81, 0.0932, 2003, 'Ananke?');
INSERT INTO public.moon VALUES (41, 'S/2003 J 10', 5, 13.0000000000000000, 22730813, -700.13, 163.81, 0.3438, 2003, 'Carme?');
INSERT INTO public.moon VALUES (42, 'S/2003 J 23', 5, 13.0000000000000000, 22739654, -700.54, 148.85, 0.3930, 2004, 'Pasiphaë');
INSERT INTO public.moon VALUES (43, 'Erinome', 5, 13.6020599913279998, 22986266, -711.96, 163.74, 0.2552, 2001, 'Carme');
INSERT INTO public.moon VALUES (44, 'Aoede', 5, 13.9542425094393003, 23044175, -714.66, 160.48, 0.6011, 2003, 'Pasiphaë');
INSERT INTO public.moon VALUES (45, 'Kallichore', 5, 13.0000000000000000, 23111823, -717.81, 164.60, 0.2041, 2003, 'Carme?');
INSERT INTO public.moon VALUES (46, 'Kalyke', 5, 14.2787536009528004, 23180773, -721.02, 165.50, 0.2139, 2001, 'Carme');
INSERT INTO public.moon VALUES (47, 'Carme', 5, 17.1139433523068014, 23197992, -763.95, 165.05, 0.2342, 1938, 'Carme');
INSERT INTO public.moon VALUES (48, 'Callirrhoe', 5, 14.9395192526186005, 23214986, -727.11, 139.85, 0.2582, 2000, 'Pasiphaë');
INSERT INTO public.moon VALUES (49, 'Eurydome', 5, 13.6020599913279998, 23230858, -723.36, 149.32, 0.3769, 2002, 'Pasiphaë?');
INSERT INTO public.moon VALUES (50, 'S/2011 J 2', 5, 13.0000000000000000, 23329710, -725.06, 151.80, 0.3867, 2011, 'Pasiphaë?');
INSERT INTO public.moon VALUES (51, 'Pasithee', 5, 13.0000000000000000, 23307318, -726.93, 165.76, 0.3288, 2002, 'Carme');
INSERT INTO public.moon VALUES (52, 'S/2010 J 1', 5, 13.0000000000000000, 23314335, -722.83, 163.20, 0.3200, 2010, 'Pasiphaë?');
INSERT INTO public.moon VALUES (53, 'Kore', 5, 13.0000000000000000, 23345093, -776.02, 137.37, 0.1951, 2003, 'Pasiphaë');
INSERT INTO public.moon VALUES (54, 'Cyllene', 5, 13.0000000000000000, 23396269, -731.10, 140.15, 0.4115, 2003, 'Pasiphaë');
INSERT INTO public.moon VALUES (55, 'Eukelade', 5, 13.9542425094393003, 23483694, -735.20, 164.00, 0.2828, 2003, 'Carme');
INSERT INTO public.moon VALUES (56, 'S/2003 J 4', 5, 13.0000000000000000, 23570790, -739.29, 147.18, 0.3003, 2003, 'Pasiphaë');
INSERT INTO public.moon VALUES (57, 'Pasiphaë', 5, 17.4771212547197017, 23609042, -739.80, 141.80, 0.3743, 1908, 'Pasiphaë');
INSERT INTO public.moon VALUES (58, 'Hegemone', 5, 13.6020599913279998, 23702511, -745.50, 152.51, 0.4077, 2003, 'Pasiphaë');
INSERT INTO public.moon VALUES (59, 'Arche', 5, 13.6020599913279998, 23717051, -746.19, 164.59, 0.1492, 2002, 'Carme');
INSERT INTO public.moon VALUES (60, 'Isonoe', 5, 13.8450980400142996, 23800647, -750.13, 165.13, 0.1775, 2001, 'Carme');
INSERT INTO public.moon VALUES (61, 'S/2003 J 9', 5, 13.0000000000000000, 23857808, -752.84, 164.98, 0.2761, 2003, 'Carme');
INSERT INTO public.moon VALUES (62, 'S/2003 J 5', 5, 13.9542425094393003, 23973926, -758.34, 165.55, 0.3070, 2003, 'Carme');
INSERT INTO public.moon VALUES (63, 'Sinope', 5, 16.8750612633917001, 24057865, -739.33, 153.78, 0.2750, 1914, 'Pasiphaë');
INSERT INTO public.moon VALUES (64, 'Sponde', 5, 13.0000000000000000, 24252627, -771.60, 154.37, 0.4431, 2002, 'Pasiphaë');
INSERT INTO public.moon VALUES (65, 'Autonoe', 5, 13.9542425094393003, 24264445, -772.17, 151.06, 0.3690, 2002, 'Pasiphaë');
INSERT INTO public.moon VALUES (66, 'Megaclite', 5, 14.3222192947339000, 24687239, -792.44, 150.40, 0.3077, 2001, 'Pasiphaë');
INSERT INTO public.moon VALUES (67, 'S/2003 J 2', 5, 13.0000000000000000, 30290846, -1077.02, 153.52, 0.1882, 2003, '*?*');


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 1, 0.06, 0.39, 0.24, 3.38, 0.206, 58.64, 0, 0.04, false, 'minimal', 0.382, false);
INSERT INTO public.planet VALUES (2, 'Venus', 1, 0.82, 0.72, 0.62, 3.86, 0.007, -243.02, 0, 177.36, false, 'CO2, N2', 0.949, false);
INSERT INTO public.planet VALUES (4, 'Mars', 1, 0.11, 1.52, 1.88, 5.65, 0.093, 1.03, 2, 25.19, false, 'CO2, N2, Ar', 0.532, false);
INSERT INTO public.planet VALUES (5, 'Jupiter', 1, 317.80, 5.20, 11.86, 6.09, 0.048, 0.41, 79, 3.13, true, 'H2, He', 11.209, false);
INSERT INTO public.planet VALUES (6, 'Saturn', 1, 95.20, 9.54, 29.46, 5.51, 0.054, 0.43, 82, 26.73, true, 'H2, He', 9.449, false);
INSERT INTO public.planet VALUES (7, 'Uranus', 1, 14.60, 19.22, 84.01, 6.48, 0.047, -0.72, 27, 97.77, true, 'H2, He, CH4', 4.007, false);
INSERT INTO public.planet VALUES (8, 'Neptune', 1, 17.20, 30.06, 164.80, 6.43, 0.009, 0.67, 14, 28.32, true, 'H2, He, CH4', 3.883, false);
INSERT INTO public.planet VALUES (9, 'Ninth Planet', 1, 0.06, 0.39, 0.24, 3.38, 0.206, 58.64, 0, 0.04, false, 'minimal', 0.382, false);
INSERT INTO public.planet VALUES (10, 'Tenth Planet', 1, 0.82, 0.72, 0.62, 3.86, 0.007, -243.02, 0, 177.36, false, 'CO2, N2', 0.949, false);
INSERT INTO public.planet VALUES (11, 'Secret Planet', 4, 1.00, 1.00, 1.00, 7.25, 0.017, 1.00, 1, 23.44, false, 'N2, O2, Ar', 1.000, false);
INSERT INTO public.planet VALUES (3, 'Earth', 1, 1.00, 1.00, 1.00, 7.25, 0.017, 1.00, 1, 23.44, false, 'N2, O2, Ar', 1.000, true);
INSERT INTO public.planet VALUES (12, 'Alien Planet', 5, 0.11, 1.52, 1.88, 5.65, 0.093, 1.03, 2, 25.19, false, 'CO2, N2, Ar', 0.532, true);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sol', 1, '4900 million years', 0.000, 'G2', 'V');
INSERT INTO public.star VALUES (2, 'Alpha Centaury', 1, '6520 million years', 1.347, 'G2', 'V');
INSERT INTO public.star VALUES (3, 'Beta Centauri', 1, '6520 million years', 1.347, 'K4', 'V');
INSERT INTO public.star VALUES (4, 'Proxima Centauri', 1, '6520 million years', 1.295, 'M5e', 'V');
INSERT INTO public.star VALUES (5, 'Sirius A', 1, '300 million years', 2.637, 'A1', 'V');
INSERT INTO public.star VALUES (6, 'Sirius B', 1, '300 million years', 2.637, 'DA2', 'wd');


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 3, true);


--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 6, true);


--
-- Name: moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_id_seq', 67, true);


--
-- Name: planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_id_seq', 12, true);


--
-- Name: star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_id_seq', 6, true);


--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: asteroid asteroid_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

