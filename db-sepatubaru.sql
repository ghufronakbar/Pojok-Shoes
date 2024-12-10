-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Des 2024 pada 10.40
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-sepatubaru`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(10) NOT NULL,
  `admin_nama` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `checkout`
--

CREATE TABLE `checkout` (
  `checkout_id` int(10) NOT NULL,
  `keranjang_id` int(11) NOT NULL,
  `checkout_waktu` datetime DEFAULT NULL,
  `checkout_status` enum('dipesan','dijemput','diproses','dibayar','selesai') DEFAULT 'dipesan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `checkout`
--

INSERT INTO `checkout` (`checkout_id`, `keranjang_id`, `checkout_waktu`, `checkout_status`) VALUES
(1, 1, '2024-10-06 21:15:01', NULL),
(2, 107, '2024-11-30 06:37:11', 'diproses'),
(3, 108, '2024-12-02 09:25:17', 'selesai'),
(4, 109, '2024-12-02 09:31:14', 'dipesan'),
(5, 110, '2024-12-02 10:31:22', 'dipesan'),
(6, 99, '2024-12-02 10:33:00', 'dipesan'),
(7, 111, '2024-12-02 10:35:52', 'dipesan'),
(8, 112, '2024-12-03 11:46:57', 'dipesan'),
(9, 113, '2024-12-04 04:04:23', 'dipesan'),
(10, 102, '2024-12-04 04:05:53', 'dipesan'),
(11, 101, '2024-12-04 04:15:16', 'dipesan'),
(12, 100, '2024-12-04 04:16:31', 'dipesan'),
(13, 94, '2024-12-04 04:18:01', 'dipesan'),
(14, 93, '2024-12-04 04:20:04', 'dipesan'),
(15, 92, '2024-12-04 04:23:51', 'dipesan'),
(16, 95, '2024-12-04 04:24:12', 'dipesan'),
(17, 91, '2024-12-04 04:24:57', 'dipesan'),
(18, 90, '2024-12-04 04:27:12', 'dipesan'),
(19, 89, '2024-12-04 04:30:59', 'dipesan'),
(20, 88, '2024-12-04 04:31:15', 'dipesan'),
(21, 87, '2024-12-04 04:37:00', 'dipesan'),
(22, 86, '2024-12-04 04:39:14', 'dipesan'),
(23, 85, '2024-12-04 04:41:19', 'dipesan'),
(24, 84, '2024-12-04 04:42:55', 'dipesan'),
(25, 83, '2024-12-04 04:43:13', 'dipesan'),
(26, 82, '2024-12-04 04:48:50', 'dipesan'),
(27, 114, '2024-12-04 04:49:45', 'dipesan'),
(28, 115, '2024-12-04 04:53:06', 'dipesan'),
(29, 116, '2024-12-04 04:54:32', 'dipesan'),
(30, 117, '2024-12-04 04:59:23', 'dipesan'),
(31, 118, '2024-12-04 05:01:32', 'dipesan'),
(32, 119, '2024-12-04 05:02:42', 'dipesan'),
(33, 120, '2024-12-04 05:20:03', 'dipesan'),
(34, 121, '2024-12-04 05:50:52', 'dipesan'),
(35, 122, '2024-12-04 06:49:53', 'dipesan'),
(39, 124, '2024-12-05 07:41:04', 'dipesan'),
(41, 125, '2024-12-05 07:42:41', 'dipesan'),
(42, 126, '2024-12-05 07:50:32', 'dipesan'),
(43, 127, '2024-12-05 07:51:24', 'dipesan'),
(44, 123, '2024-12-06 08:53:22', 'dipesan'),
(45, 128, '2024-12-06 08:57:01', 'dipesan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detailkeranjang`
--

CREATE TABLE `detailkeranjang` (
  `detail_id` int(10) NOT NULL,
  `keranjang_id` int(10) NOT NULL,
  `layanan_id` int(10) NOT NULL,
  `jumlah_sepatu` int(11) NOT NULL,
  `detail_harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `detailkeranjang`
--

INSERT INTO `detailkeranjang` (`detail_id`, `keranjang_id`, `layanan_id`, `jumlah_sepatu`, `detail_harga`) VALUES
(1, 8, 1, 2, 0),
(2, 8, 1, 2, 0),
(3, 8, 2, 1, 0),
(4, 9, 1, 2, 0),
(5, 9, 2, 1, 0),
(6, 7, 1, 2, 0),
(7, 7, 2, 1, 0),
(8, 32, 2, 1, 0),
(9, 33, 1, 1, 0),
(10, 33, 2, 1, 0),
(11, 34, 1, 1, 0),
(12, 34, 3, 1, 0),
(13, 35, 2, 1, 0),
(14, 36, 1, 1, 0),
(15, 36, 2, 1, 0),
(16, 37, 3, 1, 0),
(17, 38, 2, 1, 0),
(18, 39, 5, 1, 0),
(19, 40, 9, 1, 0),
(20, 41, 1, 1, 0),
(21, 41, 2, 1, 0),
(22, 41, 3, 1, 0),
(23, 42, 4, 1, 0),
(24, 42, 5, 1, 0),
(25, 42, 6, 1, 0),
(26, 43, 7, 1, 0),
(27, 43, 8, 1, 0),
(28, 43, 9, 1, 0),
(29, 44, 10, 1, 0),
(30, 44, 11, 1, 0),
(31, 44, 12, 1, 0),
(32, 45, 5, 1, 0),
(33, 45, 6, 1, 0),
(34, 46, 12, 1, 0),
(35, 47, 10, 1, 0),
(36, 48, 7, 1, 0),
(37, 50, 2, 1, 0),
(38, 53, 4, 1, 0),
(39, 53, 5, 1, 0),
(40, 54, 6, 1, 0),
(45, 56, 1, 2, 20000),
(46, 56, 2, 1, 10000),
(47, 56, 1, 2, 20000),
(48, 56, 2, 1, 10000),
(49, 55, 1, 2, 20000),
(50, 55, 2, 1, 10000),
(51, 55, 1, 2, 20000),
(52, 55, 2, 1, 10000),
(53, 55, 1, 2, 20000),
(54, 55, 2, 1, 10000),
(55, 54, 1, 2, 20000),
(56, 54, 2, 1, 10000),
(61, 56, 1, 2, 20000),
(62, 56, 9, 1, 10000),
(63, 55, 1, 2, 20000),
(64, 55, 9, 1, 10000),
(65, 55, 1, 2, 20000),
(66, 55, 9, 1, 10000),
(67, 56, 1, 2, 20000),
(68, 56, 9, 1, 10000),
(69, 56, 1, 2, 20000),
(70, 56, 9, 1, 10000),
(71, 56, 1, 2, 20000),
(72, 56, 3, 1, 10000),
(73, 56, 1, 2, 20000),
(74, 56, 3, 1, 10000),
(75, 56, 1, 2, 20000),
(76, 56, 3, 1, 10000),
(77, 56, 1, 2, 20000),
(78, 56, 3, 1, 10000),
(81, 55, 1, 2, 20000),
(82, 55, 3, 1, 10000),
(83, 55, 1, 2, 20000),
(84, 55, 3, 1, 10000),
(85, 55, 1, 2, 20000),
(86, 55, 3, 1, 10000),
(87, 55, 1, 2, 20000),
(88, 55, 3, 1, 10000),
(89, 56, 1, 2, 20000),
(90, 56, 3, 1, 10000),
(91, 56, 1, 2, 20000),
(92, 56, 3, 1, 10000),
(93, 61, 6, 1, 5000),
(94, 62, 2, 1, 5000),
(95, 63, 5, 1, 5000),
(96, 63, 6, 1, 5000),
(97, 64, 6, 1, 5000),
(98, 65, 2, 1, 5000),
(99, 66, 5, 1, 5000),
(100, 67, 7, 1, 5000),
(101, 68, 12, 1, 5000),
(102, 69, 4, 1, 5000),
(103, 70, 1, 1, 5000),
(104, 71, 8, 1, 5000),
(105, 72, 10, 1, 5000),
(106, 74, 6, 1, 5000),
(107, 56, 1, 2, 20000),
(108, 56, 3, 1, 10000),
(109, 75, 5, 1, 28000),
(110, 75, 4, 2, 48000),
(111, 75, 6, 1, 34000),
(112, 75, 1, 2, 40000),
(113, 75, 7, 1, 35000),
(114, 75, 10, 1, 80000),
(115, 75, 2, 1, 25000),
(116, 75, 12, 1, 140000),
(117, 75, 12, 1, 140000),
(118, 75, 8, 1, 50000),
(119, 76, 1, 1, 20000),
(120, 76, 6, 1, 34000),
(121, 77, 6, 1, 34000),
(122, 77, 1, 1, 20000),
(123, 78, 4, 1, 24000),
(124, 79, 6, 2, 68000),
(125, 80, 4, 1, 24000),
(126, 81, 5, 1, 28000),
(127, 82, 6, 1, 34000),
(128, 83, 5, 1, 28000),
(129, 84, 4, 1, 24000),
(130, 85, 5, 1, 28000),
(131, 86, 6, 1, 34000),
(132, 87, 4, 1, 24000),
(133, 87, 3, 1, 30000),
(134, 87, 4, 1, 24000),
(135, 88, 3, 1, 30000),
(136, 88, 5, 1, 28000),
(137, 89, 6, 1, 34000),
(138, 90, 4, 2, 48000),
(139, 91, 5, 2, 56000),
(140, 92, 3, 1, 30000),
(141, 92, 6, 1, 34000),
(142, 92, 7, 1, 35000),
(143, 92, 10, 1, 80000),
(144, 93, 12, 1, 140000),
(145, 94, 10, 1, 80000),
(146, 95, 8, 1, 50000),
(147, 95, 1, 1, 20000),
(148, 96, 3, 1, 30000),
(149, 93, 6, 2, 68000),
(150, 93, 4, 2, 48000),
(151, 93, 5, 1, 28000),
(152, 93, 6, 1, 34000),
(153, 93, 4, 1, 24000),
(154, 93, 6, 1, 34000),
(155, 93, 4, 1, 24000),
(156, 93, 5, 1, 28000),
(157, 97, 4, 1, 24000),
(158, 98, 4, 1, 24000),
(159, 98, 5, 1, 28000),
(160, 98, 6, 1, 34000),
(161, 99, 6, 1, 34000),
(162, 100, 5, 1, 28000),
(163, 101, 6, 1, 34000),
(164, 102, 4, 1, 24000),
(165, 102, 5, 2, 56000),
(166, 101, 5, 5, 140000),
(167, 101, 4, 1, 24000),
(168, 103, 5, 1, 28000),
(169, 103, 4, 1, 24000),
(170, 103, 1, 1, 20000),
(171, 104, 4, 1, 24000),
(172, 105, 3, 1, 30000),
(173, 105, 9, 1, 70000),
(174, 105, 12, 1, 140000),
(175, 106, 7, 1, 35000),
(176, 106, 10, 1, 80000),
(177, 107, 11, 2, 240000),
(178, 65, 3, 1, 30000),
(179, 108, 3, 1, 30000),
(180, 108, 12, 1, 140000),
(181, 108, 10, 1, 80000),
(182, 109, 6, 1, 34000),
(183, 109, 10, 1, 80000),
(184, 110, 12, 1, 140000),
(185, 99, 6, 1, 34000),
(186, 111, 12, 1, 140000),
(187, 112, 11, 1, 120000),
(188, 112, 6, 1, 34000),
(189, 113, 6, 1, 34000),
(190, 114, 3, 1, 30000),
(191, 115, 12, 1, 140000),
(192, 116, 9, 1, 70000),
(193, 117, 1, 1, 20000),
(194, 118, 12, 1, 140000),
(195, 119, 6, 1, 34000),
(196, 120, 2, 2, 50000),
(197, 121, 6, 1, 34000),
(198, 122, 6, 1, 34000),
(201, 124, 10, 1, 80000),
(202, 125, 1, 2, 40000),
(203, 126, 9, 1, 70000),
(204, 127, 8, 1, 50000),
(206, 123, 3, 1, 30000),
(207, 128, 8, 1, 50000),
(208, 128, 9, 1, 70000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `keranjang`
--

CREATE TABLE `keranjang` (
  `keranjang_id` int(10) NOT NULL,
  `pelanggan_id` int(11) NOT NULL,
  `keranjang_tanggal` datetime DEFAULT NULL,
  `keranjang_jumlah_harga` decimal(10,2) NOT NULL,
  `keranjang_status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `keranjang`
--

INSERT INTO `keranjang` (`keranjang_id`, `pelanggan_id`, `keranjang_tanggal`, `keranjang_jumlah_harga`, `keranjang_status`) VALUES
(1, 1, NULL, 0.00, '0'),
(2, 1, NULL, 0.00, '0'),
(3, 3, '2024-11-09 10:06:01', 200000.00, '0'),
(4, 3, '2024-11-19 06:16:14', 2000000.00, '0'),
(5, 2, '2024-11-19 06:31:09', 20000.00, '0'),
(6, 4, '2024-11-19 06:36:42', 25000.00, '0'),
(7, 4, '2024-11-19 06:36:45', 25000.00, '0'),
(8, 2, '2024-11-19 07:59:44', 20000.00, '0'),
(9, 4, '2024-11-19 08:23:20', 20000.00, '0'),
(10, 4, '2024-11-19 08:30:00', 45000.00, '0'),
(11, 4, '2024-11-19 08:33:28', 25000.00, '0'),
(12, 4, '2024-11-19 08:37:45', 30000.00, '0'),
(13, 4, '2024-11-19 08:43:37', 60000.00, '0'),
(14, 4, '2024-11-19 09:01:55', 20000.00, '0'),
(15, 4, '2024-11-19 09:05:56', 25000.00, '0'),
(16, 4, '2024-11-19 09:08:06', 50000.00, '0'),
(17, 4, '2024-11-19 09:12:48', 30000.00, '0'),
(18, 4, '2024-11-19 09:16:01', 50000.00, '0'),
(19, 4, '2024-11-19 09:21:02', 34000.00, '0'),
(20, 4, '2024-11-19 09:21:57', 30000.00, '0'),
(21, 4, '2024-11-19 10:29:34', 60000.00, '0'),
(22, 4, '2024-11-19 10:55:26', 60000.00, '0'),
(23, 4, '2024-11-19 10:55:48', 60000.00, '0'),
(24, 4, '2024-11-19 10:56:56', 85000.00, '0'),
(25, 4, '2024-11-19 11:34:35', 30000.00, '0'),
(26, 4, '2024-11-19 11:43:20', 90000.00, '0'),
(27, 4, '2024-11-19 12:05:06', 30000.00, '0'),
(28, 4, '2024-11-20 00:36:12', 25000.00, '0'),
(29, 4, '2024-11-20 00:36:40', 25000.00, '0'),
(30, 4, '2024-11-20 00:36:46', 65000.00, '0'),
(31, 2, '2024-11-20 00:48:13', 700000.00, '0'),
(32, 4, '2024-11-20 01:19:27', 25000.00, '0'),
(33, 4, '2024-11-20 01:20:17', 45000.00, '0'),
(34, 4, '2024-11-20 01:20:58', 50000.00, '0'),
(35, 4, '2024-11-20 02:39:32', 25000.00, '0'),
(36, 4, '2024-11-20 03:04:39', 45000.00, '0'),
(37, 4, '2024-11-20 03:22:51', 30000.00, '0'),
(38, 4, '2024-11-21 08:36:35', 25000.00, '0'),
(39, 4, '2024-11-21 08:42:36', 28000.00, '0'),
(40, 4, '2024-11-21 08:52:38', 70000.00, '0'),
(41, 4, '2024-11-21 08:55:10', 75000.00, '0'),
(42, 4, '2024-11-21 08:55:38', 86000.00, '0'),
(43, 4, '2024-11-21 08:55:59', 155000.00, '0'),
(44, 4, '2024-11-21 08:56:23', 340000.00, '0'),
(45, 4, '2024-11-22 11:11:55', 62000.00, '0'),
(46, 4, '2024-11-22 11:32:39', 140000.00, '0'),
(47, 4, '2024-11-23 06:46:22', 80000.00, '0'),
(48, 4, '2024-11-23 07:08:51', 35000.00, '0'),
(50, 4, '2024-11-23 09:06:21', 25000.00, '0'),
(53, 5, '2024-11-23 10:06:00', 52000.00, '0'),
(54, 5, '2024-11-23 10:28:21', 34000.00, '0'),
(55, 5, '2024-11-23 11:06:54', 28000.00, '0'),
(56, 5, '2024-11-23 11:06:56', 28000.00, '0'),
(57, 2, '2024-11-23 12:12:06', 700000.00, '0'),
(58, 5, '2024-11-23 12:14:42', 68000.00, '0'),
(59, 5, '2024-11-23 12:17:10', 28000.00, '0'),
(60, 5, '2024-11-23 12:19:00', 24000.00, '0'),
(61, 5, '2024-11-23 12:37:50', 34000.00, '0'),
(62, 4, '2024-11-23 12:38:20', 25000.00, '0'),
(63, 5, '2024-11-23 12:38:37', 62000.00, '0'),
(64, 5, '2024-11-23 12:40:37', 34000.00, '1'),
(65, 4, '2024-11-24 08:32:25', 35000.00, '1'),
(66, 5, '2024-11-24 08:33:06', 28000.00, '1'),
(67, 4, '2024-11-24 08:33:43', 35000.00, '1'),
(68, 4, '2024-11-24 08:33:52', 140000.00, '1'),
(69, 5, '2024-11-24 08:34:50', 24000.00, '1'),
(70, 5, '2024-11-24 08:48:29', 20000.00, '1'),
(71, 5, '2024-11-24 08:53:51', 50000.00, '1'),
(72, 5, '2024-11-24 08:54:20', 80000.00, '1'),
(73, 2, '2024-11-24 09:05:42', 700000.00, '1'),
(74, 5, '2024-11-24 09:15:05', 34000.00, '1'),
(75, 5, '2024-11-24 10:29:58', 28000.00, '1'),
(76, 4, '2024-11-25 03:09:46', 20000.00, '1'),
(77, 5, '2024-11-25 03:11:27', 34000.00, '1'),
(78, 6, '2024-11-25 03:12:54', 24000.00, '1'),
(79, 5, '2024-11-25 03:13:35', 68000.00, '1'),
(80, 6, '2024-11-25 03:21:30', 24000.00, '1'),
(81, 5, '2024-11-25 03:22:22', 28000.00, '1'),
(82, 6, '2024-11-25 03:23:13', 34000.00, '0'),
(83, 4, '2024-11-25 03:40:00', 28000.00, '0'),
(84, 4, '2024-11-25 03:40:46', 24000.00, '0'),
(85, 4, '2024-11-25 03:41:25', 28000.00, '0'),
(86, 6, '2024-11-25 03:52:03', 34000.00, '0'),
(87, 6, '2024-11-25 03:52:30', 24000.00, '0'),
(88, 6, '2024-11-25 03:54:36', 30000.00, '0'),
(89, 4, '2024-11-25 03:57:56', 34000.00, '0'),
(90, 5, '2024-11-25 03:58:37', 48000.00, '0'),
(91, 4, '2024-11-25 03:59:07', 56000.00, '0'),
(92, 6, '2024-11-26 09:48:00', 30000.00, '0'),
(93, 7, '2024-11-26 10:07:22', 428000.00, '0'),
(94, 4, '2024-11-26 10:21:25', 80000.00, '0'),
(95, 6, '2024-11-26 11:02:09', 50000.00, '0'),
(96, 7, '2024-11-27 12:55:11', 30000.00, '0'),
(97, 11, '2024-11-27 14:39:24', 24000.00, '0'),
(98, 11, '2024-11-27 14:42:59', 86000.00, '0'),
(99, 11, '2024-11-27 14:47:26', 68000.00, '0'),
(100, 12, '2024-11-27 14:48:32', 28000.00, '0'),
(101, 13, '2024-11-27 14:52:12', 198000.00, '0'),
(102, 13, '2024-11-27 14:53:14', 80000.00, '0'),
(103, 14, '2024-11-28 03:39:32', 72000.00, '0'),
(104, 14, '2024-11-28 03:53:16', 24000.00, '0'),
(105, 14, '2024-11-28 03:53:54', 240000.00, '0'),
(106, 14, '2024-11-28 04:39:08', 115000.00, '0'),
(107, 14, '2024-11-28 04:39:58', 240000.00, '0'),
(108, 14, '2024-11-30 07:25:45', 250000.00, '0'),
(109, 14, '2024-12-02 09:30:54', 114000.00, '0'),
(110, 14, '2024-12-02 10:31:19', 140000.00, '0'),
(111, 14, '2024-12-02 10:35:48', 140000.00, '0'),
(112, 15, '2024-12-03 11:46:28', 154000.00, '0'),
(113, 14, '2024-12-04 04:04:20', 34000.00, '0'),
(114, 14, '2024-12-04 04:49:42', 30000.00, '0'),
(115, 14, '2024-12-04 04:53:02', 140000.00, '0'),
(116, 14, '2024-12-04 04:54:25', 70000.00, '0'),
(117, 14, '2024-12-04 04:59:20', 20000.00, '0'),
(118, 14, '2024-12-04 05:01:28', 140000.00, '0'),
(119, 14, '2024-12-04 05:02:38', 34000.00, '0'),
(120, 14, '2024-12-04 05:19:59', 50000.00, '0'),
(121, 14, '2024-12-04 05:50:48', 34000.00, '0'),
(122, 14, '2024-12-04 06:49:48', 34000.00, '0'),
(123, 15, '2024-12-05 07:35:59', 30000.00, '0'),
(124, 14, '2024-12-05 07:40:56', 80000.00, '0'),
(125, 14, '2024-12-05 07:42:31', 40000.00, '0'),
(126, 14, '2024-12-05 07:50:26', 70000.00, '0'),
(127, 14, '2024-12-05 07:51:15', 50000.00, '0'),
(128, 15, '2024-12-06 08:56:48', 120000.00, '0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `layanan`
--

CREATE TABLE `layanan` (
  `layanan_id` int(10) NOT NULL,
  `layanan_nama` varchar(255) NOT NULL,
  `layanan_harga` int(11) NOT NULL,
  `layanan_deskripsi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `layanan`
--

INSERT INTO `layanan` (`layanan_id`, `layanan_nama`, `layanan_harga`, `layanan_deskripsi`) VALUES
(1, 'Fast Clean Sintetis', 20000, 'Cuci Bagian Luar Sepatu 1/2 Hari'),
(2, 'Fast Clean Kanvas', 25000, 'Cuci Bagian Luar Sepatu 1/2 Hari'),
(3, 'Fast Clean Suede', 30000, 'Cuci Bagian Luar Sepatu 1/2 Hari'),
(4, 'Deep Clean Sintetis', 24000, 'Cuci Menyeluruh 2/3 Hari'),
(5, 'Deep Clean Kanvas', 28000, 'Cuci Menyeluruh 2/3 Hari'),
(6, 'Deep Clean Suede', 34000, 'Cuci Menyeluruh 2/3 Hari'),
(7, 'Reglue Sintetis', 35000, 'Pengeleman Pada Sole Yang Rusak'),
(8, 'Reglue Kanvas', 50000, 'Pengeleman Pada Sole Yang Rusak'),
(9, 'Reglue Suede', 70000, 'Pengeleman Pada Sole Yang Rusak'),
(10, 'Recolor Sintetis', 80000, 'Pewarnaan Ulang Pada Sepatu'),
(11, 'Recolor Kanvas', 120000, 'Pewarnaan Ulang Pada Sepatu'),
(12, 'Recolor Suede', 140000, 'Pewarnaan Ulang Pada Sepatu');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE `pelanggan` (
  `pelanggan_id` int(10) NOT NULL,
  `pelanggan_nama` varchar(255) NOT NULL,
  `pelanggan_email` varchar(255) NOT NULL,
  `pelanggan_alamat` varchar(255) NOT NULL,
  `pelanggan_nomor` varchar(255) NOT NULL,
  `pelanggan_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `pelanggan`
--

INSERT INTO `pelanggan` (`pelanggan_id`, `pelanggan_nama`, `pelanggan_email`, `pelanggan_alamat`, `pelanggan_nomor`, `pelanggan_password`) VALUES
(1, 'ryan', 'ryan@gmail.com', 'slmn', '08986543', ''),
(2, 'Nama Pelanggan', 'ryan22@gmail.com', 'Alamat Pelanggan', '1234567890', '$2b$10$PapPjgwK6T3Um79VHW7aY.6hra3YJH0yPeWU9jA48yF491zQ1a2i.'),
(3, 'Nama Pelanggan 1', 'ryan33@gmail.com', 'Alamat Pelanggan 1', '12345678901', '$2b$10$ntG.vAGOMx5GAfmnYfRiAeMBtNODc.PZoqou3IZl0x7/L1X5VyqDC'),
(4, 'okee1', 'ryan44@gmail.com', 'Alamat 7', '038464268', '$2b$10$xzvTkAgTfVJuH3AI0C.MKuH7ng6BcgyFI7NqNZR8CCHsriwLl2DM2'),
(5, 'fachri', 'ryan55@gmail.com', 'Alamat 9', '03846426834', '$2b$10$vKLHsEsCpCMsIrsVLPz4XeIFvK0HytXQO0.QWQVsn7vIMbKq3IZMK'),
(6, 'maulana', 'fff@gmail.com', 'Alamat 90', '089272625', '$2b$10$Wj2eEDPtj90XuVsNtKoQfep9/xE/TiY4YFJ8.bAGw7vN4ho0YyuX2'),
(7, 'qasim', 'fffa@gmail.com', 'Alamat 22', '0892827725', '$2b$10$JlYxJDvApv/BJhqLTXeaE.Z1ZHoI1aDUsGgYApGL8XT98eLBl2Cra'),
(8, 'iniaku', 'fffaaaa@gmail.com', 'Alamat 800', '09282623623', '$2b$10$RAwnwpg.pivTHFWDY1f4LesF6Svga45JNDKYX513eynci1TkRp7Rq'),
(9, 'slemanpss', 'psssleman@gmail.com', 'ykcity', '08762262781', '$2b$10$wWT019fpWpBGreXLVgK00.hwSGVlkVQZvT53SCY2nhc8KTUtj4Dze'),
(10, 'salomon', 'Salomon@gmail.com', 'ykcitygo', '0987638392', '$2b$10$JNHhLQY/.Ewlhxq9opiPl.coG7LDe9cK374o3rLg/y/zaVWsrIIQu'),
(11, 'a', 'a@email.com', 'jogja', '12415164623', '$2b$10$dQSggsea84dnYvMppgAVsOnAA9zJWPi.DmGKTFOogkEb.wFVM9Yze'),
(12, 'b', 'b@email.com', 'jogja', '1521351515', '$2b$10$rTH5ZkyJRtdZBGIBwAerTOE9mXhlUSCGzZ5K6O5CRtT/16q5fx4Ne'),
(13, 'cc', 'cc@gmail.com', 'ykcc', '834739347', '$2b$10$mT/hBTj8bKNKpNGks3KLFuVHaR9sI87XneudcH9W6lFxmJWdYK.gu'),
(14, 'iki', 'iki@gmail.com', 'slmn', '93823734920', '$2b$10$rj6fuAYB8hny5Avkwqj9Gu4mdZbhltaHO1QUUuRMk.DHogUd4L3fi'),
(15, 'silva', 'silva@gmail.com', 'ina', '2482921313', '$2b$10$sPrgmuFTwGtI6Hksk21QneEcY/EgedKBMTc31GU4s/mPmeFq1g0/m'),
(16, 'iniakuuu', 'fffaaaaaaa@gmail.com', 'Alamat 800', '09282623345623', '$2b$10$wTVirZgGPCKyIxVnxW8KXentnhbu7aCgJ8sC8Y7.aif8c.PpIWk0S'),
(17, 'kb', 'kb@gmail.com', 'kei', '829938131', '$2b$10$lG5P7PFzBxsRZUZdsdBmWehiZ0QCF/QnY1yqtOtlCsxrgQRqFi20W');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `pembayaran_id` int(10) NOT NULL,
  `checkout_id` int(10) NOT NULL,
  `pembayaran_jumlahbayar` decimal(10,0) NOT NULL,
  `pembayaran_metode` varchar(255) NOT NULL,
  `pembayaran_status` varchar(255) NOT NULL,
  `pembayaran_waktu` datetime DEFAULT NULL,
  `snaptoken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`pembayaran_id`, `checkout_id`, `pembayaran_jumlahbayar`, `pembayaran_metode`, `pembayaran_status`, `pembayaran_waktu`, `snaptoken`) VALUES
(1, 2, 50000, 'credit_card', 'snapResponse.transaction_status', '2024-11-30 09:12:09', 'b306866e-da8d-4d1f-88fb-430394bf6c12'),
(2, 4, 114000000, 'credit_card', 'snapResponse.transaction_status', '2024-12-02 09:33:44', 'b287df9a-bbaa-4385-bad3-3f1f8f628bb8'),
(3, 26, 34000, 'Midtrans', 'pending', '2024-12-04 04:48:51', '66f22904-dcfc-4a92-b898-030b5804aea9'),
(4, 27, 30000, 'Midtrans', 'pending', '2024-12-04 04:49:45', '05749138-bf0c-49f9-b77b-47a779636dd1'),
(5, 28, 140000, 'Midtrans', 'pending', '2024-12-04 04:53:06', 'ceb50d14-0b69-4e4e-b22e-f4a3002d7859'),
(6, 29, 70000, 'Midtrans', 'pending', '2024-12-04 04:54:33', '06ddc788-56de-4436-8e1d-622d1c4bc66c'),
(7, 30, 20000, 'Midtrans', 'pending', '2024-12-04 04:59:24', 'aa20a02a-3f2b-4546-b264-cd12bd1abb60'),
(8, 31, 140000, 'Midtrans', 'pending', '2024-12-04 05:01:32', '7a59d748-6dff-4c2a-80a9-05b915e052de'),
(9, 32, 34000, 'Midtrans', 'pending', '2024-12-04 05:02:43', 'f452005c-21f8-43a0-9664-d00ab041660f'),
(10, 33, 50000, 'Midtrans', 'pending', '2024-12-04 05:20:04', 'd1da0206-3a81-40db-bf28-2b7ae8ee2cc7'),
(11, 34, 34000, 'Midtrans', 'pending', '2024-12-04 05:50:53', '49271216-90fb-413d-92d7-9d77518f4287'),
(12, 35, 34000, 'Midtrans', 'pending', '2024-12-04 06:49:54', '0cdadb1a-41f8-4035-b7f6-ebad8998d02a'),
(13, 39, 80000, 'Midtrans', 'success', '2024-12-05 07:41:26', '9e2e0e43-4a17-4373-9f8b-2798f9d61fd5'),
(14, 41, 40000, 'Midtrans', 'success', '2024-12-05 07:44:15', '38f6139d-6295-4ebd-92c6-45e0f196748f'),
(15, 42, 70000, 'Midtrans', 'success', '2024-12-05 07:50:44', '6017c65b-314e-48a6-b851-685533d6f49c'),
(16, 43, 50000, 'Midtrans', 'success', '2024-12-05 07:51:40', '3840b7b5-d332-4074-b76d-82f1b948b03e'),
(17, 44, 30000, 'Midtrans', 'pending', '2024-12-06 08:53:24', '0ea7707d-b071-4e32-8ebf-e120c5b84fff'),
(18, 45, 120000, 'Midtrans', 'pending', '2024-12-06 08:57:05', '0d9fc0d7-b8fc-4d48-9f2a-7056419c66fa');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indeks untuk tabel `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`checkout_id`),
  ADD KEY `fk_keranjangcheckout` (`keranjang_id`);

--
-- Indeks untuk tabel `detailkeranjang`
--
ALTER TABLE `detailkeranjang`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `keranjang_id` (`keranjang_id`),
  ADD KEY `layanan_id` (`layanan_id`);

--
-- Indeks untuk tabel `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`keranjang_id`),
  ADD KEY `fk_pelanggankeranjang` (`pelanggan_id`);

--
-- Indeks untuk tabel `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`layanan_id`);

--
-- Indeks untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`pelanggan_id`),
  ADD UNIQUE KEY `pelanggan_email` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_2` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_3` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_4` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_5` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_6` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_7` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_8` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_9` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_10` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_11` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_12` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_13` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_14` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_15` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_16` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_17` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_18` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_19` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_20` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_21` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_22` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_23` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_24` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_25` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_26` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_27` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_28` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_29` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_30` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_31` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_32` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_33` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_34` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_35` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_36` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_37` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_38` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_39` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_40` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_41` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_42` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_43` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_44` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_45` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_46` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_47` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_48` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_49` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_50` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_51` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_52` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_53` (`pelanggan_email`),
  ADD UNIQUE KEY `pelanggan_email_54` (`pelanggan_email`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`pembayaran_id`),
  ADD KEY `fk_pembayaran_checkout` (`checkout_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `checkout`
--
ALTER TABLE `checkout`
  MODIFY `checkout_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `detailkeranjang`
--
ALTER TABLE `detailkeranjang`
  MODIFY `detail_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT untuk tabel `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `keranjang_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT untuk tabel `layanan`
--
ALTER TABLE `layanan`
  MODIFY `layanan_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `pelanggan_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `pembayaran_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `fk_keranjangcheckout` FOREIGN KEY (`keranjang_id`) REFERENCES `keranjang` (`keranjang_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `detailkeranjang`
--
ALTER TABLE `detailkeranjang`
  ADD CONSTRAINT `detailkeranjang_ibfk_197` FOREIGN KEY (`keranjang_id`) REFERENCES `keranjang` (`keranjang_id`),
  ADD CONSTRAINT `detailkeranjang_ibfk_198` FOREIGN KEY (`layanan_id`) REFERENCES `layanan` (`layanan_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `fk_pelanggankeranjang` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`pelanggan_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `fk_pembayaran_checkout` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_10` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_11` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_12` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_13` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_14` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_15` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_16` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_17` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_18` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_19` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_2` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_20` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_21` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_22` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_23` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_24` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_25` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_26` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_27` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_28` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_29` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_3` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_30` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_31` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_32` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_33` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_34` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_35` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_36` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_4` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_5` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_6` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_7` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_8` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`),
  ADD CONSTRAINT `pembayaran_ibfk_9` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`checkout_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
