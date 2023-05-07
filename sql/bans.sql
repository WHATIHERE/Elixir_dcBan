-- --------------------------------------------------------
-- สำหรับเซิฟเวอร์ที่ไม่มี sql bans
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `fuckbase`;
USE `fuckbase`;

CREATE TABLE IF NOT EXISTS `bans` (
  `license` text DEFAULT NULL,
  `steam` varchar(256) DEFAULT NULL,
  `discord_id` varchar(50) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
