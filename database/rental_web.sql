--
-- PostgreSQL database dump
--

\restrict Fcd9QvAApGR5qRo5POeGyHIgU00edYNpUmvllESR6g9EDeM34L7kydlCrfzYftM

-- Dumped from database version 16.14 (Homebrew)
-- Dumped by pg_dump version 16.14 (Homebrew)

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
-- Name: appointments; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    room_id integer,
    customer_name character varying(255),
    phone character varying(50),
    appointment_date date,
    note text,
    created_at timestamp without time zone DEFAULT now(),
    appointment_time time without time zone,
    user_id integer
);


ALTER TABLE public.appointments OWNER TO nguyenphuongngoc;

--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: booking; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.booking (
    id integer NOT NULL,
    user_id integer,
    room_id integer,
    created_at timestamp without time zone DEFAULT now(),
    customer_name character varying(255),
    citizen_id character varying(20),
    phone character varying(20),
    email character varying(255),
    occupation character varying(255),
    workplace character varying(255),
    people_count integer,
    move_in_date date,
    rental_period character varying(100),
    purpose text,
    note text,
    status character varying(20) DEFAULT 'pending'::character varying
);


ALTER TABLE public.booking OWNER TO nguyenphuongngoc;

--
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booking_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.booking.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.images (
    id integer NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    created_by integer
);


ALTER TABLE public.images OWNER TO nguyenphuongngoc;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: room_images; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.room_images (
    id integer NOT NULL,
    room_id integer,
    image_id integer,
    type character varying(50)
);


ALTER TABLE public.room_images OWNER TO nguyenphuongngoc;

--
-- Name: room_images_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.room_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_images_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: room_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.room_images_id_seq OWNED BY public.room_images.id;


--
-- Name: roomimages; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.roomimages (
    id integer NOT NULL,
    room_id integer,
    image_id integer,
    created_at timestamp without time zone DEFAULT now(),
    created_by integer
);


ALTER TABLE public.roomimages OWNER TO nguyenphuongngoc;

--
-- Name: roomimages_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.roomimages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roomimages_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: roomimages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.roomimages_id_seq OWNED BY public.roomimages.id;


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    title character varying(255),
    price integer,
    created_at timestamp without time zone DEFAULT now(),
    created_by integer,
    updated_by integer,
    updated_at timestamp without time zone DEFAULT now(),
    cover_image_id integer,
    status character varying(20) DEFAULT 'available'::character varying
);


ALTER TABLE public.rooms OWNER TO nguyenphuongngoc;

--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooms_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    key character varying(255),
    value text,
    description character varying(255)
);


ALTER TABLE public.settings OWNER TO nguyenphuongngoc;

--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.settings_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: nguyenphuongngoc
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    role character varying(50),
    created_by integer,
    updated_by integer,
    avatar_image_id integer,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO nguyenphuongngoc;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenphuongngoc
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO nguyenphuongngoc;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenphuongngoc
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: booking id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.booking ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: room_images id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.room_images ALTER COLUMN id SET DEFAULT nextval('public.room_images_id_seq'::regclass);


--
-- Name: roomimages id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.roomimages ALTER COLUMN id SET DEFAULT nextval('public.roomimages_id_seq'::regclass);


--
-- Name: rooms id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);


--
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.appointments (id, room_id, customer_name, phone, appointment_date, note, created_at, appointment_time, user_id) FROM stdin;
1	1	Ngoc	0123456789	2026-07-01	Xem phòng	2026-06-24 16:15:39.076907	\N	\N
3	1	sabrina	091234649	2026-07-15	gặp chủ nhà	2026-06-29 15:47:31.243214	14:00:00	\N
2	1	Phương Ngọc	0855967112	2026-07-12	muốn gặp chủ nhà	2026-06-24 17:07:45.333846	15:00:00	10
6	1	ngọc	012345678	2026-11-13		2026-07-01 09:19:54.674954	11:00:00	2
9	6	ngọc	012345678	2027-11-11	gặp chủ nhà	2026-07-01 11:08:11.861929	15:00:00	2
10	2	ngọc	091234567	2026-11-11		2026-07-01 14:41:05.917291	15:00:00	2
11	4	ngoc	123456778	2026-06-12	muốn găpj chủ nhà để trao đổi	2026-07-01 14:44:55.011376	12:00:00	2
\.


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.booking (id, user_id, room_id, created_at, customer_name, citizen_id, phone, email, occupation, workplace, people_count, move_in_date, rental_period, purpose, note, status) FROM stdin;
107	1	1	2026-05-26 10:22:20.169659	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	pending
108	2	3	2026-05-26 10:22:20.169659	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	pending
109	3	2	2026-05-26 10:22:20.169659	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	pending
110	\N	1	2026-06-26 14:47:29.742544	Nguyễn Văn A	079123456789	0987654321	abc@gmail.com	Kỹ sư phần mềm	FPT Software	2	2026-07-01	12 tháng	Ở lâu dài	Muốn nhận phòng cuối tuần	pending
111	\N	\N	2026-06-26 15:48:13.123452	phương	0012345678	0915121122	maiphuong@gmail.com	giáo viên	tiểu học	1	2026-11-11	12	thuê đi dạy		pending
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.images (id, url, created_at, created_by) FROM stdin;
1	file:///Users/nguyenphuongngoc/Documents/visa/a%CC%89nh%20the%CC%89%203x4.jpg	2026-05-27 09:02:00.531127	1
2	file:///Users/nguyenphuongngoc/Downloads/avatar%20user%20duc.jpg	2026-05-27 09:29:09.690087	4
3	https://avatarhub.edu.vn/wp-content/uploads/2025/12/avatar-mac-dinh-cua-fb-4.jpg	2026-05-27 09:32:57.877019	2
4	https://avatarhub.edu.vn/wp-content/uploads/2025/12/avatar-mac-dinh-cua-fb-4.jpg	2026-05-27 09:34:15.616627	3
10	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-60.jpg	2026-05-27 10:04:54.080167	1
11	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-21.jpg	2026-05-27 10:28:30.331437	1
12	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-30.jpg	2026-05-27 10:28:30.331437	1
13	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-31.jpg	2026-05-27 10:28:30.331437	1
14	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-41.jpg	2026-05-27 10:28:30.331437	1
15	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg	2026-05-27 10:28:30.331437	1
16	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-19.jpg	2026-05-27 10:28:30.331437	1
5	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-24.jpg	2026-05-27 10:04:54.080167	1
17	https://moso.vn/_next/image?url=https%3A%2F%2Fmoso.vn%2Fs%2Fp%2F1782094664817-watermarked_dewatermark_0_202606d406d7f70dc55c1a51900ecbf845aa31.webp&w=1920&q=65	2026-07-06 15:52:40.589349	\N
7	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-58.jpg	2026-05-27 10:04:54.080167	1
9	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-3.jpg	2026-05-27 10:04:54.080167	1
8	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-6.jpg	2026-05-27 10:04:54.080167	1
6	https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-7.jpg	2026-05-27 10:04:54.080167	1
\.


--
-- Data for Name: room_images; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.room_images (id, room_id, image_id, type) FROM stdin;
\.


--
-- Data for Name: roomimages; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.roomimages (id, room_id, image_id, created_at, created_by) FROM stdin;
1	1	13	2026-05-27 10:31:34.528027	1
2	1	14	2026-05-27 10:31:34.528027	1
3	1	15	2026-05-27 10:31:34.528027	1
4	1	16	2026-05-27 10:31:34.528027	1
5	1	13	2026-05-27 10:52:50.111686	1
6	1	14	2026-05-27 10:52:50.111686	1
7	1	15	2026-05-27 10:52:50.111686	1
8	1	16	2026-05-27 10:52:50.111686	1
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.rooms (id, title, price, created_at, created_by, updated_by, updated_at, cover_image_id, status) FROM stdin;
6	Phòng A6	2800000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	10	available
7	Phòng A7	2500000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	\N	occupied
3	Phòng A3	3200000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	7	available
5	Phòng A5	3000000	2026-05-26 10:24:26.352804	\N	1	2026-05-26 16:11:12.804845	9	available
4	Phòng A4	4200000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	8	occupied
2	Phòng A2	3500000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	6	occupied
8	Phòng A8	3500000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	\N	available
9	Phòng A9	3500000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:11:12.804845	\N	available
10	Phòng A10	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
11	Phòng A11	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
12	Phòng A12	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
13	Phòng A13	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
14	Phòng A14	3000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
15	Phòng A15	3000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
16	Phòng B1	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
17	Phòng B2	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
18	Phòng B3	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
19	Phòng B4	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
20	Phòng B1	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
21	Phòng B2	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
22	Phòng B3	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
23	Phòng B4	1500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
24	Phòng B5	2500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
25	Phòng B6	2500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
26	Phòng B7	2500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
27	Phòng B8	2500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
28	Phòng B9	2100000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
29	Phòng B10	2100000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
30	Phòng B11	2300000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
31	Phòng B12	2300000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
32	Phòng B13	2300000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
33	Phòng B14	3000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
34	Phòng B15	3000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
35	Phòng D1	2100000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
36	Phòng D2	2100000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
37	Phòng D3	2300000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
38	Phòng D4	2300000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
39	Phòng D5	2500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
40	Phòng D6	2500000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
41	Phòng D7	1700000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
42	Phòng D8	1700000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
43	Phòng D9	1900000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
44	Phòng D10	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
45	Phòng D11	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
46	Phòng D12	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
47	Phòng D13	2300000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
48	Phòng D14	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
49	Phòng D15	2000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
50	Cửa hàng 1	7000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
51	Cửa hàng 2	7000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
52	Cửa hàng 3	7000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
53	Cửa hàng 4	7000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
54	Cửa hàng 5	7000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
55	Cửa hàng 6	10000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
56	Cửa hàng 7	4000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
57	Cửa hàng 8	4000000	2026-05-26 15:26:09.991188	1	1	2026-05-26 16:11:12.804845	\N	available
59	Cửa hàng 9	2000000	2026-07-06 14:17:38.302898	\N	\N	2026-07-06 14:17:38.302898	\N	available
1	Phòng A1	3500000	2026-05-26 10:24:26.352804	1	1	2026-05-26 16:17:11.683445	5	occupied
60	Phòng dự phòng	0	2026-07-06 15:52:40.60983	\N	\N	2026-07-06 15:52:40.60983	17	maintenance
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.settings (id, key, value, description) FROM stdin;
1	gia_dien	3000	giá tiền điện / số
2	internet	100000	phí internet mỗi tháng
3	nuoc	15000	giá tiền nước mỗi tháng
4	an_ninh	50000	phí an ninh
5	ve_sinh	30000	phí vệ sinh
6	payment_policy	0	Cửa hàng: thanh toán 6 tháng/lần. Phòng trọ: thanh toán 1 tháng/lần vào ngày 15 hàng tháng
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nguyenphuongngoc
--

COPY public.users (id, name, email, password, created_at, role, created_by, updated_by, avatar_image_id, updated_at) FROM stdin;
1	Sabrina	sabrina@gmail.com	123456	2026-05-26 10:23:59.233478	admin	1	1	1	2026-05-27 11:05:04.489105
4	Duc	duc@gmail.com	123	2026-05-26 10:23:59.233478	khach_	1	1	2	2026-05-27 11:05:04.489105
2	Ngoc	ngoc@gmail.com	11111	2026-05-26 10:23:59.233478	khach_	1	1	3	2026-05-27 11:05:04.489105
3	ABC	abc@gmail.com	0000	2026-05-26 10:23:59.233478	khach_	1	1	4	2026-05-27 11:05:04.489105
10	Phương	phuong@gmail.com	\N	2026-06-04 16:16:49.35778	khach_	\N	\N	\N	2026-06-04 16:16:49.35778
13	Minh	minh@gmail.com	\N	2026-06-04 16:22:15.998081	khach_ 	\N	\N	\N	2026-06-04 16:22:15.998081
16	Mai	mai@gmail.com	123456	2026-06-16 16:43:54.198943	admin	\N	\N	\N	2026-06-16 16:43:54.198943
\.


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.appointments_id_seq', 11, true);


--
-- Name: booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.booking_id_seq', 111, true);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.images_id_seq', 17, true);


--
-- Name: room_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.room_images_id_seq', 1, false);


--
-- Name: roomimages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.roomimages_id_seq', 8, true);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.rooms_id_seq', 60, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.settings_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenphuongngoc
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: room_images room_images_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_pkey PRIMARY KEY (id);


--
-- Name: roomimages roomimages_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.roomimages
    ADD CONSTRAINT roomimages_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- Name: booking booking_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- Name: booking booking_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: appointments fk_appointment_user; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fk_appointment_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users fk_avatar_image; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_avatar_image FOREIGN KEY (avatar_image_id) REFERENCES public.images(id);


--
-- Name: rooms fk_room_cover_image; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT fk_room_cover_image FOREIGN KEY (cover_image_id) REFERENCES public.images(id);


--
-- Name: images images_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: room_images room_images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id);


--
-- Name: room_images room_images_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- Name: roomimages roomimages_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.roomimages
    ADD CONSTRAINT roomimages_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id);


--
-- Name: roomimages roomimages_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenphuongngoc
--

ALTER TABLE ONLY public.roomimages
    ADD CONSTRAINT roomimages_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Fcd9QvAApGR5qRo5POeGyHIgU00edYNpUmvllESR6g9EDeM34L7kydlCrfzYftM

