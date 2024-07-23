-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2024 at 01:08 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentaldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `AppointmentID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `DentistID` int(11) DEFAULT NULL,
  `chargeID` int(11) NOT NULL,
  `AppointmentDate` date DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `ProblemDescription` text DEFAULT NULL,
  `Notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`AppointmentID`, `PatientID`, `DentistID`, `chargeID`, `AppointmentDate`, `StartTime`, `EndTime`, `Status`, `ProblemDescription`, `Notes`) VALUES
(8, 18, 19, 9, '2024-07-01', '11:45:00', '12:45:00', 'done', 'Patient requires administration of a modern anesthetic for an upcoming dental procedure. The aim is to ensure effective pain management and patient comfort during the treatment.', 'Patient has a history of mild allergic reactions to certain anesthetics. Please confirm the choice of anesthetic and monitor for any adverse reactions.'),
(10, 20, 20, 11, '2024-07-22', '13:30:00', '14:00:00', 'pending', 'Patient is experiencing symptoms of paradontosis, including gum inflammation, bleeding, and persistent bad breath. Treatment is needed to manage and mitigate the effects of this periodontal condition.', 'Patient has a history of sensitive gums and tends to have a mild reaction to certain dental cleaning agents. Please use gentle products and monitor for any signs of increased sensitivity.'),
(14, 24, 25, 6, '2024-07-13', '15:00:00', '16:00:00', 'Cancelled', 'Patient needs a standard teeth cleaning to address plaque and tartar buildup. There are no specific complaints of discomfort, but the patient seeks a thorough cleaning to maintain oral hygiene.', 'Patient has a sensitivity to cold temperatures. Please ensure that the cleaning tools are warmed up before use and avoid cold water during the procedure.');

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE `billing` (
  `BillID` int(11) NOT NULL,
  `AppointmentID` int(11) DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `PaymentStatus` varchar(20) DEFAULT NULL,
  `PaymentDate` date DEFAULT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `chargeID` int(11) NOT NULL,
  `chargeName` varchar(50) NOT NULL,
  `Cost` int(11) NOT NULL,
  `ServiceImage` varchar(50) NOT NULL,
  `Description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `charges`
--

INSERT INTO `charges` (`chargeID`, `chargeName`, `Cost`, `ServiceImage`, `Description`) VALUES
(6, 'Teeth Cleaning', 1500, 'teeth cleaning.jpg', 'During a dental cleaning, a dentist or dental hygienist will remove bacteria, plaque and tartar buildup from your teeth surfaces. '),
(7, 'Teeth Whitening', 1000, 'teeth_white.jpg', 'Some whitening products aim to actually remove extrinsic stains from your teeth, while others simply bleach intrinsic and extrinsic stains so that they appear lighter in color.'),
(8, 'Quality Brackets', 25000, 'Quality Brackets.jpg', 'Quality brackets are small orthodontic attachments (metal or ceramic) secured to a tooth for fastening an archwire. Each attachment is either soldered or welded to a previously placed band enclosing the tooth, or is bonded directly onto the tooth.'),
(9, 'Modern Anesthetic', 500, 'Modern Anesthetic.jpg', 'General anesthesia works by interrupting nerve signals in your brain and body. It prevents your brain from processing pain and from remembering what happened during your surgery. Before your surgery, you\'ll get anesthesia through an IV line that goes into a vein in your arm or hand.'),
(10, 'Root Canal Treatment ', 12000, 'Root Canal Treatment.jpg', 'A root canal is a dental procedure that repairs and saves a tooth that\'s infected, damaged, or badly decayed. It involves removing dead or dying nerve tissue and bacteria from the inside of the tooth\'s root'),
(11, 'Paradontosis', 8000, 'Paradontosis.jpg', 'Periodontitis, also known as gum disease, is a serious infection that damages the soft tissue and bone that supports teeth. It can lead to tooth loss if left untreated. '),
(12, 'Dental Implants', 40000, 'dental-implant-system.jpg', 'Dental implants are medical devices surgically implanted into the jaw to restore a person\'s ability to chew or their appearance. They provide support for artificial (fake) teeth, such as crowns, bridges, or dentures.'),
(13, 'Tooth Braces', 55000, 'Tooth Braces.jpg', 'Braces can correct a wide range of dental issues, including crooked, gapped, rotated or crowded teeth. There are several types of braces, including traditional metal braces, ceramic braces and clear aligners like Invisalign. Braces improve your smile\'s health, function and appearance.');

-- --------------------------------------------------------

--
-- Table structure for table `dentists`
--

CREATE TABLE `dentists` (
  `DentistID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Specialty` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `ProfileImage` varchar(50) DEFAULT NULL,
  `Qualifications` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dentists`
--

INSERT INTO `dentists` (`DentistID`, `UserID`, `FirstName`, `LastName`, `Specialty`, `PhoneNumber`, `Email`, `Gender`, `ProfileImage`, `Qualifications`) VALUES
(19, 32, 'Dr. Abhijit ', 'Dey', ' Periodontist', '6353465381', 'abhijit@gmail.com', 'male', 'dr_7.webp', 'BDS (Bachelor of Dental Surgery)'),
(20, 33, 'Dr. Kanika', 'Kapoor', ' Endodontist', '9313568526', 'kanika@gmail.com', 'female', 'Dr_4.jpg', 'MDS (Masters of Dental Surgery)'),
(24, 53, 'Dr. Ajay', 'Jha', 'General dentist', '8642982410', 'ajayjha@gmail.com', 'male', 'Dr_1.jpg', 'BDS (Bachelor of Dental Surgery)'),
(25, 54, 'Dr. Roop', 'Shah', 'Orthodontist', '8642982410', 'roop@gmail.com', 'female', 'Dr_6.jpg', 'MDS (Masters of Dental Surgery)');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `PatientID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `EmergencyContact` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`PatientID`, `UserID`, `FirstName`, `LastName`, `DateOfBirth`, `Gender`, `Address`, `PhoneNumber`, `Email`, `EmergencyContact`) VALUES
(18, 45, 'Aksh', 'Patel', '2024-07-01', 'male', '15, Main Market, Connaught Place, New Delhi, Delhi 110001, India', '80 2345 6789', 'aksh@gmail.com', '44 3456 7890'),
(20, 47, 'Smriti', 'Chawla', '2024-07-01', 'female', '78, Brigade Road, Ashoka Pillar, Bengaluru, Karnataka 560025, India', '22 3456 7890', 'smriti@gmail.com', '11 2345 6789'),
(24, 51, 'Nabila', 'Khan', '2024-07-01', 'female', '12, Park Street, Kolkata, West Bengal 700016, India', '79 2345 6789', 'nabila@gmail.com', '40 2345 6789');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `ScheduleID` int(11) NOT NULL,
  `DentistID` int(11) DEFAULT NULL,
  `DayOfWeek` varchar(10) DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`ScheduleID`, `DentistID`, `DayOfWeek`, `StartTime`, `EndTime`) VALUES
(6, 19, 'Monday', '09:00:00', '17:00:00'),
(7, 19, 'Tuesday', '11:00:00', '15:30:00'),
(10, 19, 'Wednesday', '09:00:00', '11:00:00'),
(11, 19, 'Thursday', '12:30:00', '14:30:00'),
(12, 19, 'Friday', '10:00:00', '16:00:00'),
(13, 19, 'Saturday', '14:00:00', '20:00:00'),
(14, 20, 'Monday', '10:30:00', '18:00:00'),
(15, 20, 'Tuesday', '12:00:00', '19:00:00'),
(16, 20, 'Wednesday', '09:00:00', '14:30:00'),
(17, 20, 'Thursday', '10:30:00', '15:30:00'),
(18, 20, 'Friday', '11:00:00', '20:00:00'),
(19, 20, 'Saturday', '12:30:00', '16:30:00'),
(20, 24, 'Monday', '11:00:00', '16:00:00'),
(21, 24, 'Tuesday', '09:00:00', '20:00:00'),
(22, 24, 'Wednesday', '09:00:00', '20:00:00'),
(23, 24, 'Thursday', '09:00:00', '18:00:00'),
(24, 24, 'Friday', '09:00:00', '20:00:00'),
(25, 24, 'Saturday', '09:00:00', '18:00:00'),
(26, 25, 'Monday', '10:00:00', '15:30:00'),
(27, 25, 'Tuesday', '10:30:00', '17:30:00'),
(28, 25, 'Wednesday', '11:00:00', '15:00:00'),
(29, 25, 'Thursday', '14:30:00', '18:00:00'),
(30, 25, 'Friday', '12:00:00', '16:30:00'),
(31, 25, 'Saturday', '12:00:00', '14:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `TreatmentID` int(11) NOT NULL,
  `AppointmentID` int(11) DEFAULT NULL,
  `TreatmentName` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Cost` decimal(10,2) DEFAULT NULL,
  `Duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treatments`
--

INSERT INTO `treatments` (`TreatmentID`, `AppointmentID`, `TreatmentName`, `Description`, `Cost`, `Duration`) VALUES
(1, 8, 'Modern Anesthetic', 'During your recent procedure, our team observed that your anesthetic response was slightly more pronounced than anticipated. This can happen due to variations in how different individuals metabolize anesthetics. Our team continuously monitors and adjusts the anesthetic levels in real-time to ensure your safety and comfort. We will continue to provide personalized care and closely monitor your recovery to address any concerns promptly.', '500.00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Role` enum('Dentist','Patient','Admin') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Role`) VALUES
(28, 'Shruti Upadhyay', '2208', 'Admin'),
(32, 'Abhijit Dey', '8759', 'Dentist'),
(33, 'Kanika Kapoor', '4032', 'Dentist'),
(45, 'Aksh Patel', '1907', 'Patient'),
(47, 'Smriti Chawla', '2807', 'Patient'),
(51, 'Nabila Khan', '8426', 'Patient'),
(53, 'Ajay Jha', 'ajay1105', 'Dentist'),
(54, 'Roop Mukherjee', 'roop1121', 'Dentist');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`AppointmentID`),
  ADD KEY `PatientID` (`PatientID`),
  ADD KEY `DentistID` (`DentistID`),
  ADD KEY `appointments_ibfk_3` (`chargeID`);

--
-- Indexes for table `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`BillID`),
  ADD KEY `AppointmentID` (`AppointmentID`);

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`chargeID`);

--
-- Indexes for table `dentists`
--
ALTER TABLE `dentists`
  ADD PRIMARY KEY (`DentistID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`PatientID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`ScheduleID`),
  ADD KEY `DentistID` (`DentistID`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`TreatmentID`),
  ADD KEY `AppointmentID` (`AppointmentID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `AppointmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `billing`
--
ALTER TABLE `billing`
  MODIFY `BillID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `chargeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `dentists`
--
ALTER TABLE `dentists`
  MODIFY `DentistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `PatientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `ScheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `TreatmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patients` (`PatientID`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`DentistID`) REFERENCES `dentists` (`DentistID`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`chargeID`) REFERENCES `charges` (`chargeID`);

--
-- Constraints for table `billing`
--
ALTER TABLE `billing`
  ADD CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`AppointmentID`) REFERENCES `appointments` (`AppointmentID`);

--
-- Constraints for table `dentists`
--
ALTER TABLE `dentists`
  ADD CONSTRAINT `dentists_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`DentistID`) REFERENCES `dentists` (`DentistID`);

--
-- Constraints for table `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`AppointmentID`) REFERENCES `appointments` (`AppointmentID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
