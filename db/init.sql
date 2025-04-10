--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Postgres.app)
-- Dumped by pg_dump version 17.0

-- Started on 2025-03-28 11:04:36 MSK

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 17108)
-- Name: Materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Materials" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "Description" text
);


ALTER TABLE public."Materials" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17107)
-- Name: Materials_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Materials" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Materials_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 17116)
-- Name: Motors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Motors" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "PowerKw" double precision NOT NULL,
    "CurrentA" double precision NOT NULL,
    "SpeedRpm" integer NOT NULL,
    "Description" text,
    "PriceRub" numeric NOT NULL
);


ALTER TABLE public."Motors" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17115)
-- Name: Motors_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Motors" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Motors_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 17124)
-- Name: Pumps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pumps" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "MaxPressureBar" double precision NOT NULL,
    "LiquidTemperatureC" double precision NOT NULL,
    "WeightKg" double precision NOT NULL,
    "Description" text,
    "ImageUrl" text,
    "PriceRub" numeric NOT NULL,
    "MotorId" integer,
    "HousingMaterialId" integer,
    "ImpellerMaterialId" integer
);


ALTER TABLE public."Pumps" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17123)
-- Name: Pumps_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Pumps" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Pumps_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 17102)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 3693 (class 0 OID 17108)
-- Dependencies: 219
-- Data for Name: Materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Materials" ("Id", "Name", "Description") FROM stdin;
5	Чугун	Классический материал для корпуса насоса
6	Нержавеющая сталь AISI 316	Устойчива к коррозии, используется в агрессивных средах
7	Бронза	Высокая устойчивость к износу
8	Пластик ABS	Лёгкий и стойкий материал для бытовых насосов
9	Нержавейка 12X18H10T	Кислотостойкая нержавеющая сталь
10	Алюминий	Лёгкий металл для промышленных применений
11	Углеродистая сталь	Прочный бюджетный вариант
\.


--
-- TOC entry 3695 (class 0 OID 17116)
-- Dependencies: 221
-- Data for Name: Motors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Motors" ("Id", "Name", "PowerKw", "CurrentA", "SpeedRpm", "Description", "PriceRub") FROM stdin;
8	Мотрис	1.5	3.2	2900	Стандартный электромотор для бытового насоса	8500
9	МегаМотор	5.5	10	1450	Промышленный мотор с повышенным КПД	22000
10	МиниМотор	0.75	1.6	3000	Компактный двигатель для мини-систем	5200
11	Тихий Ход	2.2	4	2850	Мотор с низким уровнем шума	12000
12	Weg W21	7.5	14.5	1500	Премиальный мотор с высоким ресурсом	31000
\.


--
-- TOC entry 3697 (class 0 OID 17124)
-- Dependencies: 223
-- Data for Name: Pumps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pumps" ("Id", "Name", "MaxPressureBar", "LiquidTemperatureC", "WeightKg", "Description", "ImageUrl", "PriceRub", "MotorId", "HousingMaterialId", "ImpellerMaterialId") FROM stdin;
6	Домашний	3.5	45	8.5	Простой насос для дачи	https://valday.nt-rt.ru/files/price/images/60021/d1fe51feb88102c149ea1985fd991190-1200x800.jpg	12500	8	5	8
8	Мининасос	2.8	30	4.2	Компактный насос	https://cdn1.ozone.ru/s3/multimedia-2/6348697802.jpg	7500	10	7	9
9	Тихоход	4	55	10.1	Насос с низким уровнем шума	https://tdtechmash.ru/upload/iblock/754/754389ff97086ab34bd39a3ce02742c7.jpg	15000	11	8	7
7	Мегапамп	6.2	60	18.2	Насос повышенной мощности	https://cdn.etm.ru/ipro/2402/qb50.jpg	29000	10	6	10
10	Wilo Pro	5.5	70	12.3	Премиальный насос для дома	https://avatars.mds.yandex.net/get-mpic/5220903/img_id5558729526437750272.png/orig	35000	12	11	6
\.


--
-- TOC entry 3691 (class 0 OID 17102)
-- Dependencies: 217
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20250324153423_InitialCreate	9.0.3
\.


--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 218
-- Name: Materials_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Materials_Id_seq"', 11, true);


--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 220
-- Name: Motors_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Motors_Id_seq"', 17, true);


--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 222
-- Name: Pumps_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pumps_Id_seq"', 10, true);


--
-- TOC entry 3535 (class 2606 OID 17114)
-- Name: Materials PK_Materials; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Materials"
    ADD CONSTRAINT "PK_Materials" PRIMARY KEY ("Id");


--
-- TOC entry 3537 (class 2606 OID 17122)
-- Name: Motors PK_Motors; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Motors"
    ADD CONSTRAINT "PK_Motors" PRIMARY KEY ("Id");


--
-- TOC entry 3542 (class 2606 OID 17130)
-- Name: Pumps PK_Pumps; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pumps"
    ADD CONSTRAINT "PK_Pumps" PRIMARY KEY ("Id");


--
-- TOC entry 3533 (class 2606 OID 17106)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 3538 (class 1259 OID 17146)
-- Name: IX_Pumps_HousingMaterialId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Pumps_HousingMaterialId" ON public."Pumps" USING btree ("HousingMaterialId");


--
-- TOC entry 3539 (class 1259 OID 17147)
-- Name: IX_Pumps_ImpellerMaterialId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Pumps_ImpellerMaterialId" ON public."Pumps" USING btree ("ImpellerMaterialId");


--
-- TOC entry 3540 (class 1259 OID 17148)
-- Name: IX_Pumps_MotorId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Pumps_MotorId" ON public."Pumps" USING btree ("MotorId");


--
-- TOC entry 3543 (class 2606 OID 17131)
-- Name: Pumps FK_Pumps_Materials_HousingMaterialId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pumps"
    ADD CONSTRAINT "FK_Pumps_Materials_HousingMaterialId" FOREIGN KEY ("HousingMaterialId") REFERENCES public."Materials"("Id") ON DELETE SET NULL;


--
-- TOC entry 3544 (class 2606 OID 17136)
-- Name: Pumps FK_Pumps_Materials_ImpellerMaterialId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pumps"
    ADD CONSTRAINT "FK_Pumps_Materials_ImpellerMaterialId" FOREIGN KEY ("ImpellerMaterialId") REFERENCES public."Materials"("Id") ON DELETE SET NULL;


--
-- TOC entry 3545 (class 2606 OID 17141)
-- Name: Pumps FK_Pumps_Motors_MotorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pumps"
    ADD CONSTRAINT "FK_Pumps_Motors_MotorId" FOREIGN KEY ("MotorId") REFERENCES public."Motors"("Id") ON DELETE SET NULL;


-- Completed on 2025-03-28 11:04:44 MSK

--
-- PostgreSQL database dump complete
--

