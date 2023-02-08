-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-02-07 16:26
-- 서버 버전: 10.4.27-MariaDB
-- PHP 버전: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `magazineb`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `magb_user`
--

CREATE TABLE `magb_user` (
  `user_idx` int(11) NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_pass` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `magb_user`
--

INSERT INTO `magb_user` (`user_idx`, `user_name`, `user_id`, `user_email`, `user_pass`, `user_level`) VALUES
(1, '서보람', 'bonam22', 'bonam22@gmail.com', '$2y$10$wqqfB5CtzyGOpQ5wAYlmZO4bnnOHWQQFRLE/K1dgkW6', 9),
(2, '김사과', 'abc1', 'abc@gmail.com', '$2y$10$9kjCf0201ErZLN.OPqYnAeqTxt8ht61O57UIld7nvvj', 9),
(3, '김딸기', 'abc2', 'abc@aaa.com', '$2y$10$CnQS2VeI0/KQoZW9Eafs2uklgp04Z/ljZgA7LqHOVTQ', 9);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `magb_user`
--
ALTER TABLE `magb_user`
  ADD PRIMARY KEY (`user_idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `magb_user`
--
ALTER TABLE `magb_user`
  MODIFY `user_idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
