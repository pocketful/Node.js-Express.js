-- table books
CREATE TABLE `books2` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `title` varchar(50) NOT NULL,
  `author` varchar(30) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `year` year(4) NOT NULL,
  `image` varchar(100) NOT NULL,
  `category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- categories
CREATE TABLE `book_categories` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `cat_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- book data
--
-- Dumping data for table `books2`
--
INSERT INTO `books2` (`id`, `title`, `author`, `timeStamp`, `year`, `image`, `category`) VALUES
(1, 'War an Peace', 'Tolstoy', '2021-10-04 05:37:06', 1950, 'war.jpg', 1),
(2, 'Red Riding Hood', 'James', '2021-10-04 05:37:15', 2000, 'redHood.jpg', 2),
(4, 'Big blue sea', 'Jane Doe', '2021-10-04 05:38:00', 2020, 'sea.jpg', 3),
(5, 'Star wars', 'Jedi', '2021-10-04 05:51:11', 2015, 'wars.jpg', NULL),
(6, '1984', 'George Orvel', '2021-10-01 09:05:18', 1970, '1984.jpg', 1),
(7, '20000 Thousand miles under sea', 'Jules Vern', '2021-10-04 07:02:05', 1960, 'sea.jpg', 1);

-- book_categories data
--
-- Dumping data for table `book_categories`
--
INSERT INTO `book_categories` (`id`, `cat_name`) VALUES
(1, 'History'),
(2, 'Chidren'),
(3, 'Fantasy'),
(4, 'Poetry');