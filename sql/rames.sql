
CREATE TABLE languages (
  ID SERIAL,
  Name varchar(255) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE question_checkbox_choices (
  ID SERIAL,
  QuestionID int NOT NULL,
  Choice varchar(255) NOT NULL,
  Textbox varchar(255) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE question_dropdown_choices (
  ID SERIAL,
  QuestionID int NOT NULL,
  Choice varchar(255) NOT NULL,
  Cond varchar(255) NOT NULL,
  Textbox varchar(255) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE question_radio_choices (
  ID SERIAL,
  QuestionID int NOT NULL,
  Choice varchar(255) NOT NULL,
  Textbox varchar(255) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE rames_category (
  ID SERIAL,
  Category varchar(255) NOT NULL,
  Info text NOT NULL,
  LanguageID int NOT NULL,
  SequenceNumber int NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE rames_info (
  ID SERIAL,
  Name varchar(255) NOT NULL,
  Info text NOT NULL,
  QuestionExplanation text NOT NULL,
  LanguageID int NOT NULL,
  CategoryID int NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE rames_picture (
  ID SERIAL,
  Name varchar(255) NOT NULL,
  Url varchar(255) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE rames_questions (
  ID SERIAL,
  CategoryID int NOT NULL,
  Question varchar(255) NOT NULL,
  Suggestion text NOT NULL,
  QuestionNr varchar(10) NOT NULL,
  Type varchar(255) NOT NULL,
  LanguageID int NOT NULL,
  RamesInfoID int NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE reports (
  ID SERIAL,
  UserID int NOT NULL,
  Name varchar(255) NOT NULL,
  ReportTypeID int NOT NULL,
  PRIMARY KEY(ID)
);


CREATE TABLE reports_info (
  ID SERIAL,
  ReportID int NOT NULL,
  QuestionID int NOT NULL,
  Answer text NOT NULL,
  PRIMARY KEY(ID)
);


CREATE TABLE reports_type (
  ID SERIAL,
  Name varchar(255) NOT NULL,
  Info text NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE Users (
  ID SERIAL,
  resettoken character varying,
  tokenexpired timestamp with time zone,
  name character varying,
  email character varying(80),
  username character varying(60),
  hash character varying,
  PRIMARY KEY(ID)
);


