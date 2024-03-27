-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-27 09:54:54
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `breakfast`
--

-- --------------------------------------------------------

--
-- 資料表結構 `main_category`
--

CREATE TABLE `main_category` (
  `main_c_id` int(3) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `main_category`
--

INSERT INTO `main_category` (`main_c_id`, `category_name`) VALUES
(1, '主餐'),
(2, '副食'),
(3, '飲品');

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `p_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `sub_category` int(11) NOT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `img` varchar(75) DEFAULT NULL,
  `on_offer` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`p_id`, `product_name`, `price`, `sub_category`, `desc`, `img`, `on_offer`) VALUES
(1, '麥香雞吐司', 40, 1, NULL, NULL, 1),
(2, '火腿蛋吐司', 45, 1, NULL, NULL, 1),
(3, '豬肉里肌吐司', 45, 1, NULL, NULL, 1),
(4, '鮪魚吐司', 40, 1, NULL, NULL, 1),
(5, '鮮蔬吐司', 35, 1, NULL, NULL, 1),
(6, '培根蛋吐司', 45, 1, NULL, NULL, 1),
(7, '卡啦雞吐司', 75, 1, NULL, NULL, 1),
(8, '起司牛肉吐司', 75, 1, NULL, NULL, 1),
(9, '草莓吐司', 30, 1, NULL, NULL, 1),
(10, '藍莓吐司', 30, 1, NULL, NULL, 1),
(11, '巧克力吐司', 30, 1, NULL, NULL, 1),
(12, '香雞漢堡', 40, 2, NULL, NULL, 1),
(13, '豬排漢堡', 40, 2, NULL, NULL, 1),
(14, '里肌豬肉漢堡', 45, 2, NULL, NULL, 1),
(15, '鮪魚漢堡', 45, 2, NULL, NULL, 1),
(16, '火腿漢堡', 45, 2, NULL, NULL, 1),
(17, '培根漢堡', 45, 2, NULL, NULL, 1),
(18, '烙烤雞腿漢堡', 60, 2, NULL, NULL, 1),
(19, '蝦排漢堡', 60, 2, NULL, NULL, 1),
(20, '炸蝦漢堡', 70, 2, NULL, NULL, 1),
(21, '卡啦炸雞漢堡', 75, 2, NULL, NULL, 1),
(22, '起司牛肉漢堡', 40, 2, NULL, NULL, 1),
(23, '原味蛋餅', 30, 3, NULL, NULL, 1),
(24, '火腿蛋餅', 40, 3, NULL, NULL, 1),
(25, '培根蛋餅', 40, 3, NULL, NULL, 1),
(26, '豬排蛋餅', 45, 3, NULL, NULL, 1),
(27, '鮪魚蛋餅', 45, 3, NULL, NULL, 1),
(28, '蔥抓餅蛋', 45, 3, NULL, NULL, 1),
(29, '起司蛋餅', 45, 3, NULL, NULL, 1),
(30, '里肌豬肉蛋餅', 50, 3, NULL, NULL, 1),
(31, '總匯蛋餅', 60, 3, NULL, NULL, 1),
(32, '蘑菇鐵板麵', 65, 4, NULL, NULL, 1),
(33, '黑胡椒鐵板麵', 65, 3, NULL, NULL, 1),
(34, '番茄肉醬義大利麵', 70, 4, NULL, NULL, 1),
(35, '青醬義大利麵', 70, 4, NULL, NULL, 1),
(36, '白醬培根義大利麵', 75, 4, NULL, NULL, 1),
(37, '薯條', 35, 5, NULL, NULL, 1),
(38, '雞塊', 45, 5, NULL, NULL, 1),
(39, '蘿蔔糕', 45, 5, NULL, NULL, 1),
(40, '雞柳條', 55, 5, NULL, NULL, 1),
(41, '熱狗', 35, 5, NULL, NULL, 1),
(42, '三角薯餅', 35, 5, NULL, NULL, 1),
(43, '煎餃', 55, 5, NULL, NULL, 1),
(44, '薯餅蛋塔', 65, 5, NULL, NULL, 1),
(45, '紅茶', 20, 6, NULL, NULL, 1),
(46, '綠茶', 20, 6, NULL, NULL, 1),
(47, '豆漿', 20, 6, NULL, NULL, 1),
(48, '無糖豆漿', 20, 6, NULL, NULL, 1),
(49, '柳橙汁', 30, 6, NULL, NULL, 1),
(50, '美式咖啡', 50, 6, NULL, NULL, 1),
(51, '拿鐵咖啡', 60, 6, NULL, NULL, 1),
(52, '奶茶', 25, 6, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `product_tag`
--

CREATE TABLE `product_tag` (
  `tag_no` int(11) NOT NULL,
  `tag_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_tag`
--

INSERT INTO `product_tag` (`tag_no`, `tag_name`) VALUES
(1, '辣味'),
(2, '蛋奶素'),
(3, '豬肉'),
(4, '雞肉'),
(5, '魚肉'),
(6, '牛肉'),
(7, '蝦子');

-- --------------------------------------------------------

--
-- 資料表結構 `product_tag_list`
--

CREATE TABLE `product_tag_list` (
  `tag_list_no` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `tag_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_tag_list`
--

INSERT INTO `product_tag_list` (`tag_list_no`, `p_id`, `tag_no`) VALUES
(1, 1, 4),
(2, 3, 3),
(3, 4, 5),
(4, 5, 2),
(5, 7, 1),
(6, 8, 6),
(7, 9, 2),
(8, 10, 2),
(9, 11, 2),
(10, 12, 4),
(11, 13, 3),
(12, 14, 3),
(13, 15, 5),
(14, 16, 3),
(15, 17, 3),
(16, 18, 4),
(17, 19, 7),
(18, 20, 7),
(19, 21, 4),
(20, 22, 6),
(21, 23, 2),
(22, 24, 3),
(23, 25, 3),
(24, 7, 4);

-- --------------------------------------------------------

--
-- 資料表結構 `sub_category`
--

CREATE TABLE `sub_category` (
  `sub_c_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `main_c_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `sub_category`
--

INSERT INTO `sub_category` (`sub_c_id`, `category_name`, `main_c_id`) VALUES
(1, '吐司', 1),
(2, '漢堡', 1),
(3, '蛋餅&抓餅', 1),
(4, '鐵板麵&義大利麵', 1),
(5, '點心', 2),
(6, '飲料', 3);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `main_category`
--
ALTER TABLE `main_category`
  ADD PRIMARY KEY (`main_c_id`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`p_id`);

--
-- 資料表索引 `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`tag_no`);

--
-- 資料表索引 `product_tag_list`
--
ALTER TABLE `product_tag_list`
  ADD PRIMARY KEY (`tag_list_no`);

--
-- 資料表索引 `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`sub_c_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `main_category`
--
ALTER TABLE `main_category`
  MODIFY `main_c_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_tag`
--
ALTER TABLE `product_tag`
  MODIFY `tag_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_tag_list`
--
ALTER TABLE `product_tag_list`
  MODIFY `tag_list_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `sub_c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
