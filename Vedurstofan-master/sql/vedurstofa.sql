--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: audit; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA audit;


ALTER SCHEMA audit OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = audit, pg_catalog;

--
-- Name: if_modified_func(); Type: FUNCTION; Schema: audit; Owner: postgres
--

CREATE FUNCTION if_modified_func() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO pg_catalog, audit
    AS $$
DECLARE
    v_old_data TEXT;
    v_new_data TEXT;
BEGIN
    /*  If this actually for real auditing (where you need to log EVERY action),
        then you would need to use something like dblink or plperl that could log outside the transaction,
        regardless of whether the transaction committed or rolled back.
    */
 
    /* This dance with casting the NEW and OLD values to a ROW is not necessary in pg 9.0+ */
 
    IF (TG_OP = 'UPDATE') THEN
        v_old_data := ROW(OLD.*);
        v_new_data := ROW(NEW.*);
        INSERT INTO audit.logged_actions (schema_name,table_name,user_name,action,original_data,new_data,query) 
        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_old_data,v_new_data, current_query());
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        v_old_data := ROW(OLD.*);
        INSERT INTO audit.logged_actions (schema_name,table_name,user_name,action,original_data,query)
        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_old_data, current_query());
        RETURN OLD;
    ELSIF (TG_OP = 'INSERT') THEN
        v_new_data := ROW(NEW.*);
        INSERT INTO audit.logged_actions (schema_name,table_name,user_name,action,new_data,query)
        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_new_data, current_query());
        RETURN NEW;
    ELSE
        RAISE WARNING '[AUDIT.IF_MODIFIED_FUNC] - Other action occurred: %, at %',TG_OP,now();
        RETURN NULL;
    END IF;
 
EXCEPTION
    WHEN data_exception THEN
        RAISE WARNING '[AUDIT.IF_MODIFIED_FUNC] - UDF ERROR [DATA EXCEPTION] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
        RETURN NULL;
    WHEN unique_violation THEN
        RAISE WARNING '[AUDIT.IF_MODIFIED_FUNC] - UDF ERROR [UNIQUE] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
        RETURN NULL;
    WHEN OTHERS THEN
        RAISE WARNING '[AUDIT.IF_MODIFIED_FUNC] - UDF ERROR [OTHER] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
        RETURN NULL;
END;
$$;


ALTER FUNCTION audit.if_modified_func() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: logged_actions; Type: TABLE; Schema: audit; Owner: postgres; Tablespace: 
--

CREATE TABLE logged_actions (
    id integer NOT NULL,
    schema_name text NOT NULL,
    table_name text NOT NULL,
    user_name text,
    action_tstamp timestamp with time zone DEFAULT now() NOT NULL,
    action text NOT NULL,
    original_data text,
    new_data text,
    query text,
    CONSTRAINT logged_actions_action_check CHECK ((action = ANY (ARRAY['I'::text, 'D'::text, 'U'::text])))
)
WITH (fillfactor=100);


ALTER TABLE logged_actions OWNER TO postgres;

--
-- Name: logged_actions_id_seq; Type: SEQUENCE; Schema: audit; Owner: postgres
--

CREATE SEQUENCE logged_actions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE logged_actions_id_seq OWNER TO postgres;

--
-- Name: logged_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: audit; Owner: postgres
--

ALTER SEQUENCE logged_actions_id_seq OWNED BY logged_actions.id;


SET search_path = public, pg_catalog;

--
-- Name: antenna_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE antenna_type (
    id integer NOT NULL,
    name character varying(50),
    igs_defined character varying(1),
    model character varying(50)
);


ALTER TABLE antenna_type OWNER TO postgres;

--
-- Name: antenna_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE antenna_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE antenna_type_id_seq OWNER TO postgres;

--
-- Name: antenna_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE antenna_type_id_seq OWNED BY antenna_type.id;


--
-- Name: attribute; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE attribute (
    name character varying(50) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE attribute OWNER TO postgres;

--
-- Name: attribute_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE attribute_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attribute_id_seq OWNER TO postgres;

--
-- Name: attribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE attribute_id_seq OWNED BY attribute.id;


--
-- Name: attributes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE attributes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attributes_id_seq OWNER TO postgres;

--
-- Name: checkcomm; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE checkcomm (
    sid character varying(4),
    ip character varying(15),
    rout_stat integer,
    recv_stat integer,
    recv_temp numeric,
    recv_volt numeric,
    "timestamp" timestamp without time zone DEFAULT now(),
    batch integer,
    pos_lat character varying(200),
    pos_lon character varying(200),
    pos_alt numeric(15,0),
    id integer NOT NULL
);


ALTER TABLE checkcomm OWNER TO postgres;

--
-- Name: checkcomm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE checkcomm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE checkcomm_id_seq OWNER TO postgres;

--
-- Name: checkcomm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE checkcomm_id_seq OWNED BY checkcomm.id;


--
-- Name: colocation_offset; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE colocation_offset (
    id integer NOT NULL,
    id_station_colocation integer NOT NULL,
    offset_x numeric,
    offset_y numeric,
    offset_z numeric,
    date_measured date NOT NULL
);


ALTER TABLE colocation_offset OWNER TO postgres;

--
-- Name: TABLE colocation_offset; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE colocation_offset IS 'Measured offset of first colocated station to second colocated station.
Contains history, most recent entry is current.';


--
-- Name: COLUMN colocation_offset.offset_x; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN colocation_offset.offset_x IS 'Measured colocation x-axis offset in meters';


--
-- Name: COLUMN colocation_offset.offset_y; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN colocation_offset.offset_y IS 'Measured colocation y-axis offset in meters';


--
-- Name: COLUMN colocation_offset.offset_z; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN colocation_offset.offset_z IS 'Measured colocation z-axis offset in meters';


--
-- Name: COLUMN colocation_offset.date_measured; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN colocation_offset.date_measured IS 'Offset measurement date';


--
-- Name: colocation_offset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE colocation_offset_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE colocation_offset_id_seq OWNER TO postgres;

--
-- Name: colocation_offset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE colocation_offset_id_seq OWNED BY colocation_offset.id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE contact (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    title character varying(50),
    company character varying(50),
    email character varying(50),
    phone character varying(50),
    gsm character varying(50),
    www character varying(250),
    comment text,
    imageurl character varying(100)
);


ALTER TABLE contact OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contact_id_seq OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE contact_id_seq OWNED BY contact.id;


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contacts_id_seq OWNER TO postgres;

--
-- Name: document; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE document (
    date date NOT NULL,
    title character varying(30) NOT NULL,
    description character varying(50),
    link character varying(60) NOT NULL,
    id_station integer NOT NULL,
    id_item integer NOT NULL,
    id_document_type integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE document OWNER TO postgres;

--
-- Name: document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE document_id_seq OWNER TO postgres;

--
-- Name: document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE document_id_seq OWNED BY document.id;


--
-- Name: document_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE document_type (
    name character varying(50) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE document_type OWNER TO postgres;

--
-- Name: document_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE document_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE document_type_id_seq OWNER TO postgres;

--
-- Name: document_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE document_type_id_seq OWNED BY document_type.id;


--
-- Name: document_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE document_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE document_types_id_seq OWNER TO postgres;

--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE documents_id_seq OWNER TO postgres;

--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE file (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    path character varying(250) NOT NULL,
    id_station integer,
    id_file_type integer,
    file_size integer,
    data_start_time timestamp without time zone,
    data_stop_time timestamp without time zone,
    published_date timestamp without time zone,
    revision_time timestamp without time zone,
    embargo_after_date timestamp without time zone,
    embargo_duration_hours integer,
    access_permission_id integer NOT NULL
);


ALTER TABLE file OWNER TO postgres;

--
-- Name: file_access_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE file_access_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE file_access_permission_id_seq OWNER TO postgres;

--
-- Name: file_access_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE file_access_permission_id_seq OWNED BY file.access_permission_id;


--
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE file_id_seq OWNER TO postgres;

--
-- Name: file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE file_id_seq OWNED BY file.id;


--
-- Name: file_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE file_type (
    name character varying(60),
    id integer NOT NULL
);


ALTER TABLE file_type OWNER TO postgres;

--
-- Name: file_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE file_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE file_type_id_seq OWNER TO postgres;

--
-- Name: file_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE file_type_id_seq OWNED BY file_type.id;


--
-- Name: file_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE file_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE file_types_id_seq OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE files_id_seq OWNER TO postgres;

--
-- Name: filter_antenna; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE filter_antenna (
    id integer NOT NULL,
    id_item integer NOT NULL,
    id_attribute integer NOT NULL,
    id_antenna_type integer
);


ALTER TABLE filter_antenna OWNER TO postgres;

--
-- Name: TABLE filter_antenna; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE filter_antenna IS 'Filter table for antenna';


--
-- Name: filter_antenna_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE filter_antenna_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE filter_antenna_id_seq OWNER TO postgres;

--
-- Name: filter_antenna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE filter_antenna_id_seq OWNED BY filter_antenna.id;


--
-- Name: filter_radome; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE filter_radome (
    id integer NOT NULL,
    id_item integer,
    id_attribute integer,
    id_radome_type integer
);


ALTER TABLE filter_radome OWNER TO postgres;

--
-- Name: filter_radome_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE filter_radome_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE filter_radome_id_seq OWNER TO postgres;

--
-- Name: filter_radome_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE filter_radome_id_seq OWNED BY filter_radome.id;


--
-- Name: filter_receiver; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE filter_receiver (
    id integer NOT NULL,
    id_item integer,
    id_attribute integer,
    id_receiver_type integer
);


ALTER TABLE filter_receiver OWNER TO postgres;

--
-- Name: filter_receiver_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE filter_receiver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE filter_receiver_id_seq OWNER TO postgres;

--
-- Name: filter_receiver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE filter_receiver_id_seq OWNED BY filter_receiver.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item (
    id integer NOT NULL,
    id_item_type integer NOT NULL,
    id_contact_as_producer integer,
    id_contact_as_owner integer,
    comment text,
    id_item_status integer,
    imageurl character varying(100),
    id_station integer
);


ALTER TABLE item OWNER TO postgres;

--
-- Name: item_attribute; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item_attribute (
    id_item integer NOT NULL,
    id_attribute integer NOT NULL,
    date_from date DEFAULT ('now'::text)::date,
    date_to date,
    value_varchar character varying(50),
    value_date date,
    value_numeric numeric
);


ALTER TABLE item_attribute OWNER TO postgres;

--
-- Name: item_comments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item_comments (
    id integer NOT NULL,
    item_id integer NOT NULL,
    comment character varying(500),
    user_id integer NOT NULL,
    date timestamp with time zone
);


ALTER TABLE item_comments OWNER TO postgres;

--
-- Name: item_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_comments_id_seq OWNER TO postgres;

--
-- Name: item_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_comments_id_seq OWNED BY item_comments.id;


--
-- Name: item_comments_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_comments_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_comments_item_id_seq OWNER TO postgres;

--
-- Name: item_comments_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_comments_item_id_seq OWNED BY item_comments.item_id;


--
-- Name: item_comments_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_comments_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_comments_user_id_seq OWNER TO postgres;

--
-- Name: item_comments_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_comments_user_id_seq OWNED BY item_comments.user_id;


--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_id_seq OWNER TO postgres;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_id_seq OWNED BY item.id;


--
-- Name: item_maintainance; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item_maintainance (
    item_id integer NOT NULL,
    user_id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    description character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE item_maintainance OWNER TO postgres;

--
-- Name: item_maintainance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_maintainance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_maintainance_id_seq OWNER TO postgres;

--
-- Name: item_maintainance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_maintainance_id_seq OWNED BY item_maintainance.id;


--
-- Name: item_maintainance_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_maintainance_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_maintainance_item_id_seq OWNER TO postgres;

--
-- Name: item_maintainance_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_maintainance_item_id_seq OWNED BY item_maintainance.item_id;


--
-- Name: item_maintainance_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_maintainance_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_maintainance_user_id_seq OWNER TO postgres;

--
-- Name: item_maintainance_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_maintainance_user_id_seq OWNED BY item_maintainance.user_id;


--
-- Name: item_status; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item_status (
    name character varying(200) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE item_status OWNER TO postgres;

--
-- Name: item_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_status_id_seq OWNER TO postgres;

--
-- Name: item_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_status_id_seq OWNED BY item_status.id;


--
-- Name: item_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item_type (
    name character varying(50) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE item_type OWNER TO postgres;

--
-- Name: item_type_attribute; Type: TABLE; Schema: public; Owner: gps; Tablespace: 
--

CREATE TABLE item_type_attribute (
    id integer NOT NULL,
    id_item_type integer NOT NULL,
    id_attribute integer NOT NULL
);


ALTER TABLE item_type_attribute OWNER TO gps;

--
-- Name: TABLE item_type_attribute; Type: COMMENT; Schema: public; Owner: gps
--

COMMENT ON TABLE item_type_attribute IS 'Defines item templates, i.e. the structure of attributes expected for an item type';


--
-- Name: item_type_attribute_id_seq; Type: SEQUENCE; Schema: public; Owner: gps
--

CREATE SEQUENCE item_type_attribute_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_type_attribute_id_seq OWNER TO gps;

--
-- Name: item_type_attribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gps
--

ALTER SEQUENCE item_type_attribute_id_seq OWNED BY item_type_attribute.id;


--
-- Name: item_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_type_id_seq OWNER TO postgres;

--
-- Name: item_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_type_id_seq OWNED BY item_type.id;


--
-- Name: item_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_types_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE items_id_seq OWNER TO postgres;

--
-- Name: log; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE log (
    title character varying(30) NOT NULL,
    date date,
    text text,
    id_log_type integer NOT NULL,
    id_station integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE log OWNER TO postgres;

--
-- Name: log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log_id_seq OWNER TO postgres;

--
-- Name: log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE log_id_seq OWNED BY log.id;


--
-- Name: log_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE log_type (
    name character varying(30) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE log_type OWNER TO postgres;

--
-- Name: log_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE log_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log_type_id_seq OWNER TO postgres;

--
-- Name: log_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE log_type_id_seq OWNED BY log_type.id;


--
-- Name: log_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE log_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log_types_id_seq OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE logs_id_seq OWNER TO postgres;

--
-- Name: network; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE network (
    name character varying(100) NOT NULL,
    id_contact integer,
    id integer NOT NULL
);


ALTER TABLE network OWNER TO postgres;

--
-- Name: network_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE network_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE network_id_seq OWNER TO postgres;

--
-- Name: network_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE network_id_seq OWNED BY network.id;


--
-- Name: networks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE networks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE networks_id_seq OWNER TO postgres;

--
-- Name: power_generation_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE power_generation_type (
    name character varying(50) NOT NULL,
    id integer NOT NULL,
    imageurl character varying(100)
);


ALTER TABLE power_generation_type OWNER TO postgres;

--
-- Name: power_generation_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE power_generation_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE power_generation_type_id_seq OWNER TO postgres;

--
-- Name: power_generation_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE power_generation_type_id_seq OWNED BY power_generation_type.id;


--
-- Name: power_generation_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE power_generation_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE power_generation_types_id_seq OWNER TO postgres;

--
-- Name: radome_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE radome_type (
    id integer NOT NULL,
    name character varying(20),
    igs_defined character varying(1),
    description character varying(250)
);


ALTER TABLE radome_type OWNER TO postgres;

--
-- Name: radome_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE radome_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE radome_type_id_seq OWNER TO postgres;

--
-- Name: radome_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE radome_type_id_seq OWNED BY radome_type.id;


--
-- Name: receiver_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE receiver_type (
    id integer NOT NULL,
    name character varying(20),
    igs_defined character varying(1),
    model character varying(50)
);


ALTER TABLE receiver_type OWNER TO postgres;

--
-- Name: receiver_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE receiver_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE receiver_type_id_seq OWNER TO postgres;

--
-- Name: receiver_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE receiver_type_id_seq OWNED BY receiver_type.id;


--
-- Name: station; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station (
    name character varying(100) NOT NULL,
    marker character varying(5) NOT NULL,
    permanent_marker character varying(15),
    lat numeric(6,4),
    lon numeric(6,4),
    altitude numeric(6,2),
    description text,
    date_from date,
    date_to date,
    id_network integer,
    id_zone integer,
    id_station_type integer,
    id_contact_as_contact integer,
    id_contact_as_data_owner integer,
    id_power_generation_type integer,
    comment text,
    id_area integer,
    id_surrounding integer,
    id_contact_as_owner integer,
    id_landscape integer,
    is_active boolean,
    id_caretaker integer,
    imageurl character varying(100),
    id integer NOT NULL
);


ALTER TABLE station OWNER TO postgres;

--
-- Name: COLUMN station.lat; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station.lat IS 'latitude in decimal degrees';


--
-- Name: COLUMN station.lon; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station.lon IS 'longitude in decimal degrees';


--
-- Name: COLUMN station.date_from; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station.date_from IS 'date station is installed';


--
-- Name: COLUMN station.date_to; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station.date_to IS 'date station is removed';


--
-- Name: COLUMN station.id_network; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station.id_network IS 'id of one named network of stations operated by an agency';


--
-- Name: station_area; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_area (
    area character varying(200) NOT NULL,
    description character varying(500) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE station_area OWNER TO postgres;

--
-- Name: station_area_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_area_id_seq OWNER TO postgres;

--
-- Name: station_area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_area_id_seq OWNED BY station_area.id;


--
-- Name: station_colocation; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_colocation (
    id integer NOT NULL,
    id_station integer NOT NULL,
    id_station_colocated integer NOT NULL
);


ALTER TABLE station_colocation OWNER TO postgres;

--
-- Name: TABLE station_colocation; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE station_colocation IS 'Colocated stations with measured offset.';


--
-- Name: COLUMN station_colocation.id_station; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station_colocation.id_station IS 'First colocated station';


--
-- Name: COLUMN station_colocation.id_station_colocated; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN station_colocation.id_station_colocated IS 'Second colocated station';


--
-- Name: station_colocation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_colocation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_colocation_id_seq OWNER TO postgres;

--
-- Name: station_colocation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_colocation_id_seq OWNED BY station_colocation.id;


--
-- Name: station_comments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_comments (
    id integer NOT NULL,
    comment character varying(500),
    date timestamp with time zone,
    station_id integer,
    user_id integer
);


ALTER TABLE station_comments OWNER TO postgres;

--
-- Name: station_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_comments_id_seq OWNER TO postgres;

--
-- Name: station_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_comments_id_seq OWNED BY station_comments.id;


--
-- Name: station_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_id_seq OWNER TO postgres;

--
-- Name: station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_id_seq OWNED BY station.id;


--
-- Name: station_item; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_item (
    id integer NOT NULL,
    id_station integer NOT NULL,
    id_item integer NOT NULL,
    date_from date,
    date_to date
);


ALTER TABLE station_item OWNER TO postgres;

--
-- Name: station_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_item_id_seq OWNER TO postgres;

--
-- Name: station_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_item_id_seq OWNED BY station_item.id;


--
-- Name: station_landscape; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_landscape (
    landscape character varying(500) NOT NULL,
    description character varying(500) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE station_landscape OWNER TO postgres;

--
-- Name: station_landscape_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_landscape_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_landscape_id_seq OWNER TO postgres;

--
-- Name: station_landscape_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_landscape_id_seq OWNED BY station_landscape.id;


--
-- Name: station_owner; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_owner (
    owner character varying(100) NOT NULL,
    description character varying(100) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE station_owner OWNER TO postgres;

--
-- Name: station_owner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_owner_id_seq OWNER TO postgres;

--
-- Name: station_owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_owner_id_seq OWNED BY station_owner.id;


--
-- Name: station_surrounding; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_surrounding (
    surroundings character varying(500) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE station_surrounding OWNER TO postgres;

--
-- Name: station_surrounding_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_surrounding_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_surrounding_id_seq OWNER TO postgres;

--
-- Name: station_surrounding_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_surrounding_id_seq OWNED BY station_surrounding.id;


--
-- Name: station_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_type (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    type character varying(50)
);


ALTER TABLE station_type OWNER TO postgres;

--
-- Name: station_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_type_id_seq OWNER TO postgres;

--
-- Name: station_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_type_id_seq OWNED BY station_type.id;


--
-- Name: station_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_types_id_seq OWNER TO postgres;

--
-- Name: station_visit; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE station_visit (
    station_id integer NOT NULL,
    date timestamp with time zone,
    reason_id integer NOT NULL,
    comments character varying(500),
    user_id integer NOT NULL,
    id integer NOT NULL,
    work_done character varying(1000),
    catagory_id integer NOT NULL,
    user2_id integer,
    user3_id integer,
    station_isokei boolean,
    next_id integer
);


ALTER TABLE station_visit OWNER TO postgres;

--
-- Name: station_visit_catagory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_catagory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_catagory_id_seq OWNER TO postgres;

--
-- Name: station_visit_catagory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_catagory_id_seq OWNED BY station_visit.catagory_id;


--
-- Name: station_visit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_id_seq OWNER TO postgres;

--
-- Name: station_visit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_id_seq OWNED BY station_visit.id;


--
-- Name: station_visit_reason_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_reason_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_reason_id_seq OWNER TO postgres;

--
-- Name: station_visit_reason_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_reason_id_seq OWNED BY station_visit.reason_id;


--
-- Name: station_visit_station_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_station_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_station_id_seq OWNER TO postgres;

--
-- Name: station_visit_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_station_id_seq OWNED BY station_visit.station_id;


--
-- Name: station_visit_user2_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_user2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_user2_id_seq OWNER TO postgres;

--
-- Name: station_visit_user2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_user2_id_seq OWNED BY station_visit.user2_id;


--
-- Name: station_visit_user3_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_user3_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_user3_id_seq OWNER TO postgres;

--
-- Name: station_visit_user3_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_user3_id_seq OWNED BY station_visit.user3_id;


--
-- Name: station_visit_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE station_visit_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE station_visit_user_id_seq OWNER TO postgres;

--
-- Name: station_visit_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE station_visit_user_id_seq OWNED BY station_visit.user_id;


--
-- Name: stations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stations_id_seq OWNER TO postgres;

--
-- Name: stations_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stations_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stations_items_id_seq OWNER TO postgres;

--
-- Name: user_group; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_group (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE user_group OWNER TO postgres;

--
-- Name: TABLE user_group; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE user_group IS 'Access control user groups consistent with the authenticating LDAP-server';


--
-- Name: user_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_group_id_seq OWNER TO postgres;

--
-- Name: user_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_group_id_seq OWNED BY user_group.id;


--
-- Name: user_group_station; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_group_station (
    id integer NOT NULL,
    id_user_groups integer,
    id_stations integer
);


ALTER TABLE user_group_station OWNER TO postgres;

--
-- Name: TABLE user_group_station; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE user_group_station IS 'Access control bridge table (many-to-many) connecting user groups and stations';


--
-- Name: user_group_station_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_group_station_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_group_station_id_seq OWNER TO postgres;

--
-- Name: user_group_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_group_station_id_seq OWNED BY user_group_station.id;


--
-- Name: user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_groups_id_seq OWNER TO postgres;

--
-- Name: user_groups_stations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_groups_stations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_groups_stations_id_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(40) NOT NULL,
    name character varying(40) NOT NULL,
    roles character varying(40),
    company character varying(40) NOT NULL,
    phone character varying(20),
    email character varying(100),
    address character varying(40),
    comments character varying(500),
    hash character varying(500),
    salt character varying(500),
    isadmin boolean,
    reset_token character varying(300),
    token_expired date,
    isactive boolean,
    imageurl character varying(100),
    isreader boolean,
    iswriter boolean,
    ismoderator boolean
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: visit_catagory; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE visit_catagory (
    id integer NOT NULL,
    equipment boolean,
    refurbish boolean,
    scale boolean,
    bearings boolean,
    precipitation_gauge boolean,
    telecommunications_equipment boolean,
    battery boolean,
    operating_system boolean,
    desiccant_refurbished boolean,
    altimeter boolean,
    photos_taken boolean,
    other boolean,
    comment character(500)
);


ALTER TABLE visit_catagory OWNER TO postgres;

--
-- Name: visit_catagory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE visit_catagory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE visit_catagory_id_seq OWNER TO postgres;

--
-- Name: visit_catagory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE visit_catagory_id_seq OWNED BY visit_catagory.id;


--
-- Name: visit_reason; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE visit_reason (
    name character varying(50),
    id integer NOT NULL,
    comment_id integer
);


ALTER TABLE visit_reason OWNER TO postgres;

--
-- Name: visit_reason_comment; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE visit_reason_comment (
    comment character(500),
    id integer NOT NULL
);


ALTER TABLE visit_reason_comment OWNER TO postgres;

--
-- Name: visit_reason_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE visit_reason_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE visit_reason_comment_id_seq OWNER TO postgres;

--
-- Name: visit_reason_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE visit_reason_comment_id_seq OWNED BY visit_reason_comment.id;


--
-- Name: visit_reason_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE visit_reason_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE visit_reason_id_seq OWNER TO postgres;

--
-- Name: visit_reason_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE visit_reason_id_seq OWNED BY visit_reason.id;


--
-- Name: zone; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE zone (
    name character varying(50) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE zone OWNER TO postgres;

--
-- Name: zone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE zone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE zone_id_seq OWNER TO postgres;

--
-- Name: zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE zone_id_seq OWNED BY zone.id;


--
-- Name: zone_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE zone_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE zone_types_id_seq OWNER TO postgres;

SET search_path = audit, pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: audit; Owner: postgres
--

ALTER TABLE ONLY logged_actions ALTER COLUMN id SET DEFAULT nextval('logged_actions_id_seq'::regclass);


SET search_path = public, pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY antenna_type ALTER COLUMN id SET DEFAULT nextval('antenna_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attribute ALTER COLUMN id SET DEFAULT nextval('attribute_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY checkcomm ALTER COLUMN id SET DEFAULT nextval('checkcomm_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY colocation_offset ALTER COLUMN id SET DEFAULT nextval('colocation_offset_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY contact ALTER COLUMN id SET DEFAULT nextval('contact_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY document ALTER COLUMN id SET DEFAULT nextval('document_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY document_type ALTER COLUMN id SET DEFAULT nextval('document_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file ALTER COLUMN id SET DEFAULT nextval('file_id_seq'::regclass);


--
-- Name: access_permission_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file ALTER COLUMN access_permission_id SET DEFAULT nextval('file_access_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file_type ALTER COLUMN id SET DEFAULT nextval('file_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY filter_antenna ALTER COLUMN id SET DEFAULT nextval('filter_antenna_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY filter_radome ALTER COLUMN id SET DEFAULT nextval('filter_radome_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY filter_receiver ALTER COLUMN id SET DEFAULT nextval('filter_receiver_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item ALTER COLUMN id SET DEFAULT nextval('item_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_comments ALTER COLUMN id SET DEFAULT nextval('item_comments_id_seq'::regclass);


--
-- Name: item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_comments ALTER COLUMN item_id SET DEFAULT nextval('item_comments_item_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_comments ALTER COLUMN user_id SET DEFAULT nextval('item_comments_user_id_seq'::regclass);


--
-- Name: item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_maintainance ALTER COLUMN item_id SET DEFAULT nextval('item_maintainance_item_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_maintainance ALTER COLUMN user_id SET DEFAULT nextval('item_maintainance_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_maintainance ALTER COLUMN id SET DEFAULT nextval('item_maintainance_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_status ALTER COLUMN id SET DEFAULT nextval('item_status_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item_type ALTER COLUMN id SET DEFAULT nextval('item_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gps
--

ALTER TABLE ONLY item_type_attribute ALTER COLUMN id SET DEFAULT nextval('item_type_attribute_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY log ALTER COLUMN id SET DEFAULT nextval('log_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY log_type ALTER COLUMN id SET DEFAULT nextval('log_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY network ALTER COLUMN id SET DEFAULT nextval('network_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY power_generation_type ALTER COLUMN id SET DEFAULT nextval('power_generation_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY radome_type ALTER COLUMN id SET DEFAULT nextval('radome_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY receiver_type ALTER COLUMN id SET DEFAULT nextval('receiver_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station ALTER COLUMN id SET DEFAULT nextval('station_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_area ALTER COLUMN id SET DEFAULT nextval('station_area_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_colocation ALTER COLUMN id SET DEFAULT nextval('station_colocation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_comments ALTER COLUMN id SET DEFAULT nextval('station_comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_item ALTER COLUMN id SET DEFAULT nextval('station_item_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_landscape ALTER COLUMN id SET DEFAULT nextval('station_landscape_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_owner ALTER COLUMN id SET DEFAULT nextval('station_owner_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_surrounding ALTER COLUMN id SET DEFAULT nextval('station_surrounding_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_type ALTER COLUMN id SET DEFAULT nextval('station_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY station_visit ALTER COLUMN id SET DEFAULT nextval('station_visit_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_group ALTER COLUMN id SET DEFAULT nextval('user_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_group_station ALTER COLUMN id SET DEFAULT nextval('user_group_station_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY visit_catagory ALTER COLUMN id SET DEFAULT nextval('visit_catagory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY visit_reason ALTER COLUMN id SET DEFAULT nextval('visit_reason_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY visit_reason_comment ALTER COLUMN id SET DEFAULT nextval('visit_reason_comment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY zone ALTER COLUMN id SET DEFAULT nextval('zone_id_seq'::regclass);


SET search_path = audit, pg_catalog;

--
-- Data for Name: logged_actions; Type: TABLE DATA; Schema: audit; Owner: postgres
--

COPY logged_actions (id, schema_name, table_name, user_name, action_tstamp, action, original_data, new_data, query) FROM stdin;
1	public	item_comments	dabbi	2015-12-03 11:28:53.737923+00	I	\N	(16,40,LALALA,1,"2015-12-03 11:28:53.737+00")	INSERT INTO item_comments (item_id, comment, user_id, date) values($1, $2, $3, $4) returning *
2	public	users	dabbi	2015-12-03 11:31:49.183602+00	U	(11,test1,test1,test1,"Veðurstofa Íslands",1234567,test1@trausti.is,"Bústaðarvegur 7-9","Má breyta upplýsingum",/b���P��8��\b�N���@*�^�:^2��x���ф`v�Q�u�m��t�v�I�A��V�z��,86d07c0aa553d560504f1bc3713fc17a,f,,,t,,,,)	(11,test1,test1,test1,"Veðurstofa Íslands",1234567,test1@trausti.is,"Bústaðarvegur 7-9","Má breyta upplýsingum","g���i���?�vfI����ab��D�+1�Ato#fG�\v���3C��}q�C��9?̽����",894ee17c42b2e2e946921ecd64db7a78,f,,,t,,,,)	UPDATE users SET hash = ($1), salt = ($2) WHERE id = ($3) 
3	public	item	dabbi	2015-12-03 11:34:28.971279+00	U	(29,1,1,1,123456,1,/image/items/undefined.png,1)	(29,1,1,1,123456,1,/image/items/undefined.png,2)	UPDATE item SET id_item_type = ($1), id_contact_as_producer=($2), id_contact_as_owner=($3), comment=($4), id_item_status=($5), imageurl=($6), id_station=($7) WHERE id=($8) returning *
4	public	station_item	dabbi	2015-12-03 11:34:28.982994+00	I	\N	(63,2,29,2015-12-03,)	INSERT INTO station_item (id_station, id_item, date_from) VALUES ($1, $2, $3) returning *
5	public	users	dabbi	2015-12-03 11:47:48.392232+00	U	(11,test1,test1,test1,"Veðurstofa Íslands",1234567,test1@trausti.is,"Bústaðarvegur 7-9","Má breyta upplýsingum","g���i���?�vfI����ab��D�+1�Ato#fG�\v���3C��}q�C��9?̽����",894ee17c42b2e2e946921ecd64db7a78,f,,,t,,,,)	(11,test1,test1,test1,"Veðurstofa Íslands",1234567,test1@trausti.is,"Bústaðarvegur 7-9","Má breyta upplýsingum","�.���;lZ G��}��Ǉ���\r��ݔ:r*rJ��G�Q�=//9�1S�Ma�a~�~�wEw���w",2a73f29506a1f55eb180fd86db3948cc,f,,,t,,,,)	UPDATE users SET hash = ($1), salt = ($2) WHERE id = ($3) 
\.
--
-- Name: logged_actions_id_seq; Type: SEQUENCE SET; Schema: audit; Owner: postgres
--
SELECT pg_catalog.setval('logged_actions_id_seq', 5, true);
SET search_path = public, pg_catalog;
--
-- Data for Name: antenna_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY antenna_type (id, name, igs_defined, model) FROM stdin;
1	"3S-02-1AERO-CR"	Y	CR
3	3S-02-1AERO-CR	Y	frf
4	3S-02-2AERO-GP	Y	frf
5	APSAPS-3	Y	fjudd
7	ASH	Y	ash
\.
--
-- Name: antenna_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('antenna_type_id_seq', 7, true);
--
-- Data for Name: attribute; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY attribute (name, id) FROM stdin;
equipment_code	1
serial_number	2
id_equipment_type	3
antenna_type	4
description	5
height	6
antenna_measurement	7
antenna_id	8
firmware_version	9
firmware_date	10
sampling_rate	11
user_name	12
password	13
phone_number	14
ip_number	15
receiver_port	16
proxy_user	17
proxy_server	18
proxy_host	19
proxy_http_port	20
monument_type	21
offset_north	22
offset_east	23
offset_elevation	24
inscription	25
receiver_type	26
model	27
htcode	28
radome_type	29
software_version	30
Test	31
\.
--
-- Name: attribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('attribute_id_seq', 31, true);
--
-- Name: attributes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('attributes_id_seq', 31, true);
--
-- Data for Name: checkcomm; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY checkcomm (sid, ip, rout_stat, recv_stat, recv_temp, recv_volt, "timestamp", batch, pos_lat, pos_lon, pos_alt, id) FROM stdin;
\.
--
-- Name: checkcomm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('checkcomm_id_seq', 1, false);
--
-- Data for Name: colocation_offset; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY colocation_offset (id, id_station_colocation, offset_x, offset_y, offset_z, date_measured) FROM stdin;
\.
--
-- Name: colocation_offset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('colocation_offset_id_seq', 1, false);
--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY contact (id, name, title, company, email, phone, gsm, www, comment, imageurl) FROM stdin;
1	Hafruns	Bes	kokok	koko	lplp	lpl	lp	fr	/image/contacts/undefined.png
\.
--
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('contact_id_seq', 1, true);
--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('contacts_id_seq', 1, false);
--
-- Data for Name: document; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY document (date, title, description, link, id_station, id_item, id_document_type, id) FROM stdin;
\.
--
-- Name: document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('document_id_seq', 1, false);
--
-- Data for Name: document_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY document_type (name, id) FROM stdin;
\.
--
-- Name: document_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('document_type_id_seq', 1, false);
--
-- Name: document_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('document_types_id_seq', 1, false);
--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('documents_id_seq', 1, false);
--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY file (id, name, path, id_station, id_file_type, file_size, data_start_time, data_stop_time, published_date, revision_time, embargo_after_date, embargo_duration_hours, access_permission_id) FROM stdin;
\.
--
-- Name: file_access_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('file_access_permission_id_seq', 1, false);
--
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('file_id_seq', 1, false);
--
-- Data for Name: file_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY file_type (name, id) FROM stdin;
\.
--
-- Name: file_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('file_type_id_seq', 1, false);
--
-- Name: file_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('file_types_id_seq', 1, false);
--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('files_id_seq', 1, false);
--
-- Data for Name: filter_antenna; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY filter_antenna (id, id_item, id_attribute, id_antenna_type) FROM stdin;
\.
--
-- Name: filter_antenna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('filter_antenna_id_seq', 3, true);
--
-- Data for Name: filter_radome; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY filter_radome (id, id_item, id_attribute, id_radome_type) FROM stdin;
\.
--
-- Name: filter_radome_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('filter_radome_id_seq', 3, true);
--
-- Data for Name: filter_receiver; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY filter_receiver (id, id_item, id_attribute, id_receiver_type) FROM stdin;
\.
--
-- Name: filter_receiver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('filter_receiver_id_seq', 1, true);
--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY item (id, id_item_type, id_contact_as_producer, id_contact_as_owner, comment, id_item_status, imageurl, id_station) FROM stdin;
36	5	1	1	123	1	/image/items/undefined.png	\N
37	1	1	1	123	1	/image/items/undefined.png	\N
15	6	1	1	fdsf	1	oppp	1
14	3	1	1	gsdfg	1	hjgsdfa	1
38	1	1	1	123	2	/image/items/undefined.png	1
39	1	1	1	123	1	/image/items/undefined.png	\N
10	1	1	1	1323	4	123123	\N
41	10	1	1	123	1	/image/items/undefined.png	\N
40	8	1	1	12	1	/image/items/undefined.png	2
21	1	1	1	bnm	4	/image/items/undefined.png	1
20	1	1	1	bbbb	4	/image/items/undefined.png	\N
22	1	1	1	mnb	4	/image/items/undefined.png	1
12	2	1	1	fds	4	dfsfd	\N
9	3	1	1	21321	4	1231232	\N
6	3	1	1	123	4	123	\N
2	8	1	1	123	4	123	\N
3	9	1	1	123	4	123	\N
17	9	1	1	123	4	/image/items/undefined.png	2
4	10	1	1	123	4	123	\N
28	1	1	1	sadfgh	4	/image/items/undefined.png	2
8	4	1	1	123	4	46546	\N
42	1	1	1	123	4	/image/items/undefined.png	2
43	1	1	1	HAHAHA	1	/image/items/undefined.png	3
29	1	1	1	123456	1	/image/items/undefined.png	2
5	7	1	1	123	2	123666666667890ö	2
7	12	1	1	123	4	fjasdlæ	4
1	2	1	1	123	4	123456	4
23	6	1	1	123	1	/image/items/undefined.png	1
19	10	1	1	ghfdhgfh	1	/image/items/undefined.png	4
27	5	1	1	123	2	/image/items/undefined.png	1
30	2	1	1	2345	1	/image/items/undefined.png	1
13	1	1	1	gfdgsd543543tgfhf	4	3456789	4
32	2	1	1	13463	1	/image/items/undefined.png	1
33	8	1	1	345	1	/image/items/undefined.png	1
25	2	1	1	12345	2	/image/items/undefined.png	4
31	1	1	1	23456t7y89	4	/image/items/undefined.png	3
24	2	1	1	ggggggggggggggggggggg1234	2	/image/items/undefined.png	1
18	1	1	1	123	4	/image/items/undefined.png	3
11	1	1	1	213	4	gfhdf	4
26	1	1	1	123	4	/image/items/undefined.png	2
34	1	1	1	123	4	/image/items/undefined.png	4
16	1	1	1	12356789	4	/image/items/undefined.png	2
35	1	1	1	123Station	1	/image/items/undefined.png	\N
\.
--
-- Data for Name: item_attribute; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY item_attribute (id_item, id_attribute, date_from, date_to, value_varchar, value_date, value_numeric) FROM stdin;
1	7	2015-11-30	\N	123	\N	\N
1	15	2015-11-30	\N	123321	\N	\N
3	2	2015-11-30	\N	123	\N	\N
4	4	2015-11-30	\N	123	\N	\N
5	4	2015-11-30	\N	123	\N	\N
6	7	2015-11-30	\N	123	\N	\N
7	6	2015-11-30	\N	41234	\N	\N
8	3	2015-11-30	\N	131	\N	\N
9	6	2015-11-30	\N	12333	\N	\N
10	8	2015-11-30	\N	gdftgfd	\N	\N
14	6	2015-11-30	\N	fgsdgfsd	\N	\N
15	2	2015-11-30	\N	4234324	\N	\N
16	3	2015-12-01	\N	1234	\N	\N
17	6	2015-12-01	\N	123	\N	\N
24	10	2015-12-01	\N	123333	\N	\N
25	2	2015-12-01	\N	12345	\N	\N
7	4	2015-12-01	\N	adsgfh	\N	\N
32	8	2015-12-02	\N	12313	\N	\N
32	14	2015-12-02	\N	1313	\N	\N
33	10	2015-12-02	\N	12312	\N	\N
29	8	2015-12-02	\N	gfdsfs	\N	\N
34	5	2015-12-02	\N	123	\N	\N
28	7	2015-12-02	\N	sdfa	\N	\N
36	8	2015-12-03	\N	123	\N	\N
39	8	2015-12-03	\N	123	\N	\N
40	7	2015-12-03	\N	123	\N	\N
42	8	2015-12-03	\N	123	\N	\N
43	10	2015-12-03	\N	123	\N	\N
\.
--
-- Data for Name: item_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY item_comments (id, item_id, comment, user_id, date) FROM stdin;
1	22	Test comment	1	2015-10-22 12:04:27.846+00
2	1	szdfxghj	1	2015-11-26 11:41:57.231+00
3	1	asdfghjk	1	2015-11-26 11:43:08.091+00
4	1	12345678	1	2015-11-26 11:43:37.699+00
5	1	frfrf	1	2015-11-26 12:37:07.447+00
6	14	fdasfasdfdas	9	2015-11-30 23:14:52.706+00
7	13	123123123	9	2015-11-30 23:15:20.819+00
8	10	fdsa	9	2015-11-30 23:15:45.376+00
9	24	asdfghj	9	2015-12-01 12:02:54.812+00
10	5	haha	9	2015-12-01 17:47:54.346+00
11	7	asdf	9	2015-12-01 17:50:49.136+00
12	29	fdasfdsa	9	2015-12-02 11:29:00.785+00
13	28	fdas	9	2015-12-02 23:01:12.021+00
14	29	test	9	2015-12-03 09:30:53.373+00
15	43	þetta er athugasemd	9	2015-12-03 10:52:15.744+00
16	40	LALALA	1	2015-12-03 11:28:53.737+00
\.
--
-- Name: item_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_comments_id_seq', 16, true);
--
-- Name: item_comments_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_comments_item_id_seq', 1, false);
--
-- Name: item_comments_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_comments_user_id_seq', 1, false);
--
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_id_seq', 43, true);
--
-- Data for Name: item_maintainance; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY item_maintainance (item_id, user_id, date, description, id) FROM stdin;
22	1	2015-10-22 12:01:19.288+00	Tester	2
\.
--
-- Name: item_maintainance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_maintainance_id_seq', 2, true);
--
-- Name: item_maintainance_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_maintainance_item_id_seq', 1, false);
--
-- Name: item_maintainance_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_maintainance_user_id_seq', 1, false);
--
-- Data for Name: item_status; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY item_status (name, id) FROM stdin;
Í notkun	1
Lager	2
Viðgerð	3
Eytt	4
\.
--
-- Name: item_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_status_id_seq', 4, true);
--
-- Data for Name: item_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY item_type (name, id) FROM stdin;
antenna	1
battery	2
charge_regulator	3
receiver	4
router	5
solar_panel	6
wind_charger	7
computer	8
digitizer	9
monument	10
radome	11
Test	12
\.
--
-- Data for Name: item_type_attribute; Type: TABLE DATA; Schema: public; Owner: gps
--
COPY item_type_attribute (id, id_item_type, id_attribute) FROM stdin;
1	1	8
2	1	7
3	1	4
4	4	16
5	4	26
6	11	29
7	4	7
\.
--
-- Name: item_type_attribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gps
--
SELECT pg_catalog.setval('item_type_attribute_id_seq', 7, true);
--
-- Name: item_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_type_id_seq', 12, true);
--
-- Name: item_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('item_types_id_seq', 1, false);
--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('items_id_seq', 1, false);
--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY log (title, date, text, id_log_type, id_station, id) FROM stdin;
\.
--
-- Name: log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('log_id_seq', 1, false);
--
-- Data for Name: log_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY log_type (name, id) FROM stdin;
\.
--
-- Name: log_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('log_type_id_seq', 1, false);
--
-- Name: log_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('log_types_id_seq', 1, false);
--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('logs_id_seq', 1, false);
--
-- Data for Name: network; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY network (name, id_contact, id) FROM stdin;
IES	\N	1
NICE	\N	2
CHIL	\N	3
Hekla	\N	4
ISGPS	\N	5
K├írahnj├║kar	\N	6
Savoie	\N	7
IGS	\N	8
LMI	\N	9
NMT	\N	10
\.
--
-- Name: network_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('network_id_seq', 10, true);
--
-- Name: networks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('networks_id_seq', 1, false);
--
-- Data for Name: power_generation_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY power_generation_type (name, id, imageurl) FROM stdin;
Main	1	\N
Solar cell	2	\N
Wind turbine	3	\N
Solar cell & wind turbine	4	\N
\.
--
-- Name: power_generation_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('power_generation_type_id_seq', 4, true);
--
-- Name: power_generation_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('power_generation_types_id_seq', 1, false);
--
-- Data for Name: radome_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY radome_type (id, name, igs_defined, description) FROM stdin;
\.
--
-- Name: radome_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('radome_type_id_seq', 1, false);
--
-- Data for Name: receiver_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY receiver_type (id, name, igs_defined, model) FROM stdin;
\.
--
-- Name: receiver_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('receiver_type_id_seq', 1, false);
--
-- Data for Name: station; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station (name, marker, permanent_marker, lat, lon, altitude, description, date_from, date_to, id_network, id_zone, id_station_type, id_contact_as_contact, id_contact_as_data_owner, id_power_generation_type, comment, id_area, id_surrounding, id_contact_as_owner, id_landscape, is_active, id_caretaker, imageurl, id) FROM stdin;
Gr├¡msey	GMEY	\N	\N	\N	\N	\N	2015-11-23	\N	2	2	2	1	\N	1	\N	2	1	\N	1	t	1	\N	4
Inntaksh├║s K├írahnj├║kavirkjunar vi├░ H├ílsl├│n	INTA	\N	64.9400	-21.0322	700.00	\N	2015-11-23	\N	8	1	2	1	1	3	Eins gott a├░ ├¥etta helv├¡ti virki	1	3	1	2	t	1	\N	3
frfrf	JAFS	sdfrf	\N	\N	\N	\N	2015-11-23	\N	3	3	1	\N	1	3	frfrfr	2	1	\N	1	t	1	\N	1
hafrun	HSHS	\N	\N	\N	\N	\N	2015-11-23	\N	2	3	1	1	1	2	\N	1	\N	1	\N	t	\N	\N	2
\.
--
-- Data for Name: station_area; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_area (area, description, id) FROM stdin;
Rusl	├¥a├░ er miki├░ rusl	1
hafrun	├×etta sv├ª├░i er algj├Âr Hafrun	2
Sau├░ur	Enn meiri sau├░ur	3
deded	dedede	4
\.
--
-- Name: station_area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_area_id_seq', 4, true);
--
-- Data for Name: station_colocation; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_colocation (id, id_station, id_station_colocated) FROM stdin;
\.
--
-- Name: station_colocation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_colocation_id_seq', 1, false);
--
-- Data for Name: station_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_comments (id, comment, date, station_id, user_id) FROM stdin;
\.
--
-- Name: station_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_comments_id_seq', 122, true);
--
-- Name: station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_id_seq', 4, true);
--
-- Data for Name: station_item; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_item (id, id_station, id_item, date_from, date_to) FROM stdin;
2	1	5	2015-11-30	\N
3	1	6	2015-11-30	\N
4	1	7	2015-11-30	\N
5	3	8	2015-11-30	\N
6	1	9	2015-11-30	\N
7	1	10	2015-11-30	\N
9	2	12	2015-11-30	\N
1	1	1	2015-11-30	2015-12-01
14	2	17	2015-12-01	2015-12-01
17	1	23	2015-12-01	2015-12-02
16	1	19	2015-12-01	2015-12-02
18	2	24	2015-12-01	2015-12-02
12	1	15	2015-11-30	2015-12-02
13	1	16	2015-12-01	2015-12-02
11	1	14	2015-11-30	2015-12-02
10	4	13	2015-11-30	2015-12-02
20	1	31	2015-12-01	2015-12-02
19	1	25	2015-12-01	2015-12-02
15	1	18	2015-12-01	2015-12-02
51	4	18	2015-12-02	2015-12-02
52	2	18	2015-12-02	2015-12-02
53	3	18	2015-12-02	\N
8	1	11	2015-11-30	2015-12-02
54	4	11	2015-12-02	\N
56	1	16	2015-12-02	2015-12-02
57	2	16	2015-12-02	2015-12-02
58	4	38	2015-12-03	\N
59	1	39	2015-12-03	\N
60	2	40	2015-12-03	\N
55	2	28	2015-12-02	2015-12-03
61	2	42	2015-12-03	2015-12-03
62	3	43	2015-12-03	\N
63	2	29	2015-12-03	\N
\.
--
-- Name: station_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_item_id_seq', 63, true);
--
-- Data for Name: station_landscape; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_landscape (landscape, description, id) FROM stdin;
solarlag	S├│lin er a├░ setjast :)	1
s├│lsetur	og aftur..	2
j├Âkull	├¥etta er st├│r j├Âkull	3
what	Kemur bara anna├░ hvert	4
\.
--
-- Name: station_landscape_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_landscape_id_seq', 4, true);
--
-- Data for Name: station_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_owner (owner, description, id) FROM stdin;
\.
--
-- Name: station_owner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_owner_id_seq', 1, false);
--
-- Data for Name: station_surrounding; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_surrounding (surroundings, id) FROM stdin;
grasfl├Âtur	1
fjall	2
L├¡ti├░ fjall	3
St├│rt fjall	4
St├│rt vatn	5
L├¡ti├░ vatn	6
\.
--
-- Name: station_surrounding_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_surrounding_id_seq', 6, true);
--
-- Data for Name: station_type; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_type (id, name, type) FROM stdin;
1	Landskerfi landhreyfinga	Continuous
2	N├ítt├║ruv├íreftirlit	Continuous
3	Ranns├│knar- og ├¥r├│unarst├Â├░	Continuous
4	T├¡mabundin st├Â├░	C
\.
--
-- Name: station_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_type_id_seq', 4, true);
--
-- Name: station_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_types_id_seq', 1, false);
--
-- Data for Name: station_visit; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY station_visit (station_id, date, reason_id, comments, user_id, id, work_done, catagory_id, user2_id, user3_id, station_isokei, next_id) FROM stdin;
\.
--
-- Name: station_visit_catagory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_catagory_id_seq', 5, true);
--
-- Name: station_visit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_id_seq', 12, true);
--
-- Name: station_visit_reason_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_reason_id_seq', 5, true);
--
-- Name: station_visit_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_station_id_seq', 1, false);
--
-- Name: station_visit_user2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_user2_id_seq', 1, false);
--
-- Name: station_visit_user3_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_user3_id_seq', 1, false);
--
-- Name: station_visit_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('station_visit_user_id_seq', 1, false);
--
-- Name: stations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('stations_id_seq', 1, false);
--
-- Name: stations_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('stations_items_id_seq', 1, false);
--
-- Data for Name: user_group; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY user_group (id, name) FROM stdin;
\.
--
-- Name: user_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('user_group_id_seq', 1, false);
--
-- Data for Name: user_group_station; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY user_group_station (id, id_user_groups, id_stations) FROM stdin;
\.
--
-- Name: user_group_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('user_group_station_id_seq', 1, false);
--
-- Name: user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('user_groups_id_seq', 1, false);
--
-- Name: user_groups_stations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('user_groups_stations_id_seq', 1, false);
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY users (id, username, name, roles, company, phone, email, address, comments, hash, salt, isadmin, reset_token, token_expired, isactive, imageurl, isreader, iswriter, ismoderator) FROM stdin;
\.
--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('users_id_seq', 1, true);
--
-- Data for Name: visit_catagory; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY visit_catagory (id, equipment, refurbish, scale, bearings, precipitation_gauge, telecommunications_equipment, battery, operating_system, desiccant_refurbished, altimeter, photos_taken, other, comment) FROM stdin;
1	t	t	t	t	t	t	t	t	t	t	t	t	allt a├░ gerast                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
2	\N	t	t	\N	\N	t	\N	\N	t	\N	\N	\N	Ekki allt vali├░                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
\.
--
-- Name: visit_catagory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('visit_catagory_id_seq', 1, false);
--
-- Data for Name: visit_reason; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY visit_reason (name, id, comment_id) FROM stdin;
kokokok	1	1
Anna├░ reason	2	2
\.
--
-- Data for Name: visit_reason_comment; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY visit_reason_comment (comment, id) FROM stdin;
Fyrsta comment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      	1
Anna├░ comment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      	2
\.
--
-- Name: visit_reason_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('visit_reason_comment_id_seq', 1, false);
--
-- Name: visit_reason_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('visit_reason_id_seq', 1, false);
--
-- Data for Name: zone; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY zone (name, id) FROM stdin;
Austurland	1
Eyjafjalla og M├¢rdalsj├Âkull	2
H├ílendi├░	3
Hekla	4
Nor├░urland	5
Reykjanes og Hengilsv├ª├░i	6
Su├░urland	7
Vatnaj├Âkull	8
Vesturland	9
j├Âr├░	10
\.
--
-- Name: zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('zone_id_seq', 10, true);
--
-- Name: zone_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('zone_types_id_seq', 1, false);
SET search_path = audit, pg_catalog;
--
-- Name: logged_actions_pkey; Type: CONSTRAINT; Schema: audit; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY logged_actions
    ADD CONSTRAINT logged_actions_pkey PRIMARY KEY (id);
SET search_path = public, pg_catalog;
--
-- Name: attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY attribute
    ADD CONSTRAINT attribute_pkey PRIMARY KEY (id);
--
-- Name: checkcomm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY checkcomm
    ADD CONSTRAINT checkcomm_pkey PRIMARY KEY (id);
--
-- Name: document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY document
    ADD CONSTRAINT document_pkey PRIMARY KEY (id);
--
-- Name: document_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY document_type
    ADD CONSTRAINT document_type_pkey PRIMARY KEY (id);
--
-- Name: file_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY file_type
    ADD CONSTRAINT file_type_pkey PRIMARY KEY (id);
--
-- Name: idx_items_attributes; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY item_attribute
    ADD CONSTRAINT idx_items_attributes PRIMARY KEY (id_item, id_attribute);
--
-- Name: item_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY item_comments
    ADD CONSTRAINT item_comments_pkey PRIMARY KEY (id);
--
-- Name: item_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY item_status
    ADD CONSTRAINT item_status_pkey PRIMARY KEY (id);
--
-- Name: item_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY item_type
    ADD CONSTRAINT item_type_pkey PRIMARY KEY (id);
--
-- Name: log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);
--
-- Name: log_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY log_type
    ADD CONSTRAINT log_type_pkey PRIMARY KEY (id);
--
-- Name: network_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY network
    ADD CONSTRAINT network_pkey PRIMARY KEY (id);
--
-- Name: pk_antenna; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY filter_antenna
    ADD CONSTRAINT pk_antenna PRIMARY KEY (id);
--
-- Name: pk_antenna_types; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY antenna_type
    ADD CONSTRAINT pk_antenna_types UNIQUE (id);
--
-- Name: pk_colocation_offset; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY colocation_offset
    ADD CONSTRAINT pk_colocation_offset PRIMARY KEY (id);
--
-- Name: pk_contacts; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY contact
    ADD CONSTRAINT pk_contacts PRIMARY KEY (id);
--
-- Name: pk_files; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY file
    ADD CONSTRAINT pk_files PRIMARY KEY (id);
--
-- Name: pk_filter_radome; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY filter_radome
    ADD CONSTRAINT pk_filter_radome PRIMARY KEY (id);
--
-- Name: pk_filter_receiver; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY filter_receiver
    ADD CONSTRAINT pk_filter_receiver PRIMARY KEY (id);
--
-- Name: pk_item_type_attribute; Type: CONSTRAINT; Schema: public; Owner: gps; Tablespace: 
--
ALTER TABLE ONLY item_type_attribute
    ADD CONSTRAINT pk_item_type_attribute PRIMARY KEY (id);
--
-- Name: pk_items; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY item
    ADD CONSTRAINT pk_items PRIMARY KEY (id);
--
-- Name: pk_receiver_types_0; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY radome_type
    ADD CONSTRAINT pk_receiver_types_0 PRIMARY KEY (id);
--
-- Name: pk_station_colocation; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_colocation
    ADD CONSTRAINT pk_station_colocation PRIMARY KEY (id);
--
-- Name: pk_station_types; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_type
    ADD CONSTRAINT pk_station_types PRIMARY KEY (id);
--
-- Name: pk_stations; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station
    ADD CONSTRAINT pk_stations PRIMARY KEY (id);
--
-- Name: pk_stations_items; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_item
    ADD CONSTRAINT pk_stations_items PRIMARY KEY (id);
--
-- Name: pk_user_group; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY user_group
    ADD CONSTRAINT pk_user_group PRIMARY KEY (id);
--
-- Name: pk_user_groups_stations; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY user_group_station
    ADD CONSTRAINT pk_user_groups_stations PRIMARY KEY (id);
--
-- Name: power_generation_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY power_generation_type
    ADD CONSTRAINT power_generation_type_pkey PRIMARY KEY (id);
--
-- Name: receiver_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY receiver_type
    ADD CONSTRAINT receiver_type_name_key UNIQUE (name);
--
-- Name: receiver_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY receiver_type
    ADD CONSTRAINT receiver_type_pkey PRIMARY KEY (id);
--
-- Name: stat_id_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY item_maintainance
    ADD CONSTRAINT stat_id_pkey PRIMARY KEY (id);
--
-- Name: station_area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_area
    ADD CONSTRAINT station_area_pkey PRIMARY KEY (id);
--
-- Name: station_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_comments
    ADD CONSTRAINT station_comments_pkey PRIMARY KEY (id);
--
-- Name: station_landscape_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_landscape
    ADD CONSTRAINT station_landscape_pkey PRIMARY KEY (id);
--
-- Name: station_owner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_owner
    ADD CONSTRAINT station_owner_pkey PRIMARY KEY (id);
--
-- Name: station_surrounding_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_surrounding
    ADD CONSTRAINT station_surrounding_pkey PRIMARY KEY (id);
--
-- Name: station_visit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_pkey PRIMARY KEY (id);
--
-- Name: uq_antenna_types_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY antenna_type
    ADD CONSTRAINT uq_antenna_types_name UNIQUE (name);
--
-- Name: uq_attributes_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY attribute
    ADD CONSTRAINT uq_attributes_name UNIQUE (name);
--
-- Name: uq_contacts_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY contact
    ADD CONSTRAINT uq_contacts_name UNIQUE (name);
--
-- Name: uq_location_types_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station_type
    ADD CONSTRAINT uq_location_types_name UNIQUE (name);
--
-- Name: uq_log_types_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY log_type
    ADD CONSTRAINT uq_log_types_name UNIQUE (name);
--
-- Name: uq_marker; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY station
    ADD CONSTRAINT uq_marker UNIQUE (marker);
--
-- Name: uq_networks_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY network
    ADD CONSTRAINT uq_networks_name UNIQUE (name);
--
-- Name: uq_power_generation_types_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY power_generation_type
    ADD CONSTRAINT uq_power_generation_types_name UNIQUE (name);
--
-- Name: uq_receiver_types_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY radome_type
    ADD CONSTRAINT uq_receiver_types_name UNIQUE (name);
--
-- Name: uq_zone_types_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY zone
    ADD CONSTRAINT uq_zone_types_name UNIQUE (name);
--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
--
-- Name: visit_maintainance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY visit_catagory
    ADD CONSTRAINT visit_maintainance_pkey PRIMARY KEY (id);
--
-- Name: visit_reason_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY visit_reason_comment
    ADD CONSTRAINT visit_reason_comment_pkey PRIMARY KEY (id);
--
-- Name: visit_reason_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY visit_reason
    ADD CONSTRAINT visit_reason_pkey PRIMARY KEY (id);
--
-- Name: zone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--
ALTER TABLE ONLY zone
    ADD CONSTRAINT zone_pkey PRIMARY KEY (id);
SET search_path = audit, pg_catalog;
--
-- Name: logged_actions_action_idx; Type: INDEX; Schema: audit; Owner: postgres; Tablespace: 
--
CREATE INDEX logged_actions_action_idx ON logged_actions USING btree (action);
--
-- Name: logged_actions_action_tstamp_idx; Type: INDEX; Schema: audit; Owner: postgres; Tablespace: 
--
CREATE INDEX logged_actions_action_tstamp_idx ON logged_actions USING btree (action_tstamp);
--
-- Name: logged_actions_schema_table_idx; Type: INDEX; Schema: audit; Owner: postgres; Tablespace: 
--
CREATE INDEX logged_actions_schema_table_idx ON logged_actions USING btree ((((schema_name || '.'::text) || table_name)));
SET search_path = public, pg_catalog;
--
-- Name: idx_antenna; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_antenna ON filter_antenna USING btree (id_item, id_attribute);
--
-- Name: idx_antennas; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_antennas ON filter_antenna USING btree (id_antenna_type);
--
-- Name: idx_colocation_offset; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_colocation_offset ON colocation_offset USING btree (id_station_colocation);
--
-- Name: idx_files_id_file_type; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_files_id_file_type ON file USING btree (id_file_type);
--
-- Name: idx_files_id_station; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_files_id_station ON file USING btree (id_station);
--
-- Name: idx_filter_radome; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_filter_radome ON filter_radome USING btree (id_item, id_attribute);
--
-- Name: idx_filter_radome_0; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_filter_radome_0 ON filter_radome USING btree (id_radome_type);
--
-- Name: idx_filter_receiver; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_filter_receiver ON filter_receiver USING btree (id_item, id_attribute);
--
-- Name: idx_filter_receiver_0; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_filter_receiver_0 ON filter_receiver USING btree (id_receiver_type);
--
-- Name: idx_item_type_attribute; Type: INDEX; Schema: public; Owner: gps; Tablespace: 
--
CREATE INDEX idx_item_type_attribute ON item_type_attribute USING btree (id_item_type);
--
-- Name: idx_item_type_attribute_0; Type: INDEX; Schema: public; Owner: gps; Tablespace: 
--
CREATE INDEX idx_item_type_attribute_0 ON item_type_attribute USING btree (id_attribute);
--
-- Name: idx_station_colocation; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_station_colocation ON station_colocation USING btree (id_station);
--
-- Name: idx_station_colocation_0; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_station_colocation_0 ON station_colocation USING btree (id_station_colocated);
--
-- Name: idx_user_groups_stations; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_user_groups_stations ON user_group_station USING btree (id_stations);
--
-- Name: idx_user_groups_stations_0; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--
CREATE INDEX idx_user_groups_stations_0 ON user_group_station USING btree (id_user_groups);
--
-- Name: antenna_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER antenna_type_audit AFTER INSERT OR DELETE OR UPDATE ON antenna_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: attribute_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER attribute_audit AFTER INSERT OR DELETE OR UPDATE ON attribute FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: checkcomm_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER checkcomm_audit AFTER INSERT OR DELETE OR UPDATE ON checkcomm FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: colocation_offset_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER colocation_offset_audit AFTER INSERT OR DELETE OR UPDATE ON colocation_offset FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: contact_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER contact_audit AFTER INSERT OR DELETE OR UPDATE ON contact FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: document_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER document_audit AFTER INSERT OR DELETE OR UPDATE ON document FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: document_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER document_type_audit AFTER INSERT OR DELETE OR UPDATE ON document_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: file_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER file_audit AFTER INSERT OR DELETE OR UPDATE ON file FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: file_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER file_type_audit AFTER INSERT OR DELETE OR UPDATE ON file_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: filter_antenna_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER filter_antenna_audit AFTER INSERT OR DELETE OR UPDATE ON filter_antenna FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: filter_radome_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER filter_radome_audit AFTER INSERT OR DELETE OR UPDATE ON filter_radome FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: filter_receiver_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER filter_receiver_audit AFTER INSERT OR DELETE OR UPDATE ON filter_receiver FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_attribute_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER item_attribute_audit AFTER INSERT OR DELETE OR UPDATE ON item_attribute FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER item_audit AFTER INSERT OR DELETE OR UPDATE ON item FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_comments_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER item_comments_audit AFTER INSERT OR DELETE OR UPDATE ON item_comments FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_maintainance_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER item_maintainance_audit AFTER INSERT OR DELETE OR UPDATE ON item_maintainance FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_status_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER item_status_audit AFTER INSERT OR DELETE OR UPDATE ON item_status FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_type_attribute_audit; Type: TRIGGER; Schema: public; Owner: gps
--
CREATE TRIGGER item_type_attribute_audit AFTER INSERT OR DELETE OR UPDATE ON item_type_attribute FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: item_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER item_type_audit AFTER INSERT OR DELETE OR UPDATE ON item_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: log_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER log_audit AFTER INSERT OR DELETE OR UPDATE ON log FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: log_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER log_type_audit AFTER INSERT OR DELETE OR UPDATE ON log_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: network_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER network_audit AFTER INSERT OR DELETE OR UPDATE ON network FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: power_generation_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER power_generation_type_audit AFTER INSERT OR DELETE OR UPDATE ON power_generation_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: radome_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER radome_type_audit AFTER INSERT OR DELETE OR UPDATE ON radome_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: receiver_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER receiver_type_audit AFTER INSERT OR DELETE OR UPDATE ON receiver_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_area_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_area_audit AFTER INSERT OR DELETE OR UPDATE ON station_area FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_audit AFTER INSERT OR DELETE OR UPDATE ON station FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_colocation_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_colocation_audit AFTER INSERT OR DELETE OR UPDATE ON station_colocation FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_comments_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_comments_audit AFTER INSERT OR DELETE OR UPDATE ON station_comments FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_item_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_item_audit AFTER INSERT OR DELETE OR UPDATE ON station_item FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_landscape_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_landscape_audit AFTER INSERT OR DELETE OR UPDATE ON station_landscape FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_owner_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_owner_audit AFTER INSERT OR DELETE OR UPDATE ON station_owner FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_surrounding_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_surrounding_audit AFTER INSERT OR DELETE OR UPDATE ON station_surrounding FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_type_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_type_audit AFTER INSERT OR DELETE OR UPDATE ON station_type FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: station_visit_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER station_visit_audit AFTER INSERT OR DELETE OR UPDATE ON station_visit FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: user_group_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER user_group_audit AFTER INSERT OR DELETE OR UPDATE ON user_group FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: user_group_station_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER user_group_station_audit AFTER INSERT OR DELETE OR UPDATE ON user_group_station FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: users_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER users_audit AFTER INSERT OR DELETE OR UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: visit_catagory_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER visit_catagory_audit AFTER INSERT OR DELETE OR UPDATE ON visit_catagory FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: visit_reason_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER visit_reason_audit AFTER INSERT OR DELETE OR UPDATE ON visit_reason FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: visit_reason_comment_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER visit_reason_comment_audit AFTER INSERT OR DELETE OR UPDATE ON visit_reason_comment FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: zone_audit; Type: TRIGGER; Schema: public; Owner: postgres
--
CREATE TRIGGER zone_audit AFTER INSERT OR DELETE OR UPDATE ON zone FOR EACH ROW EXECUTE PROCEDURE audit.if_modified_func();
--
-- Name: document_id_document_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY document
    ADD CONSTRAINT document_id_document_type_fkey FOREIGN KEY (id_document_type) REFERENCES document_type(id);
--
-- Name: file_id_file_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY file
    ADD CONSTRAINT file_id_file_type_fkey FOREIGN KEY (id_file_type) REFERENCES document_type(id);
--
-- Name: filter_antenna_id_antenna_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY filter_antenna
    ADD CONSTRAINT filter_antenna_id_antenna_type_fkey FOREIGN KEY (id_antenna_type) REFERENCES antenna_type(id);
--
-- Name: filter_radome_id_radome_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY filter_radome
    ADD CONSTRAINT filter_radome_id_radome_type_fkey FOREIGN KEY (id_radome_type) REFERENCES radome_type(id);
--
-- Name: filter_receiver_id_receiver_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY filter_receiver
    ADD CONSTRAINT filter_receiver_id_receiver_type_fkey FOREIGN KEY (id_receiver_type) REFERENCES receiver_type(id);
--
-- Name: fk_attributes_items_attributes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY item_attribute
    ADD CONSTRAINT fk_attributes_items_attributes FOREIGN KEY (id_attribute) REFERENCES attribute(id);
--
-- Name: fk_colocation_offset; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY colocation_offset
    ADD CONSTRAINT fk_colocation_offset FOREIGN KEY (id_station_colocation) REFERENCES station_colocation(id);
--
-- Name: item_id_item_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY item
    ADD CONSTRAINT item_id_item_status_fkey FOREIGN KEY (id_item_status) REFERENCES item_status(id);
--
-- Name: item_id_item_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY item
    ADD CONSTRAINT item_id_item_type_fkey FOREIGN KEY (id_item_type) REFERENCES item_type(id);
--
-- Name: item_id_station_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY item
    ADD CONSTRAINT item_id_station_fkey FOREIGN KEY (id_station) REFERENCES station(id);
--
-- Name: item_type_attribute_id_attribute_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gps
--
ALTER TABLE ONLY item_type_attribute
    ADD CONSTRAINT item_type_attribute_id_attribute_fkey FOREIGN KEY (id_attribute) REFERENCES attribute(id);
--
-- Name: item_type_attribute_id_item_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gps
--
ALTER TABLE ONLY item_type_attribute
    ADD CONSTRAINT item_type_attribute_id_item_type_fkey FOREIGN KEY (id_item_type) REFERENCES item_type(id);
--
-- Name: log_id_log_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY log
    ADD CONSTRAINT log_id_log_type_fkey FOREIGN KEY (id_log_type) REFERENCES log_type(id);
--
-- Name: network_id_contact_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY network
    ADD CONSTRAINT network_id_contact_fkey FOREIGN KEY (id_contact) REFERENCES contact(id);
--
-- Name: station_comments_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_comments
    ADD CONSTRAINT station_comments_station_id_fkey FOREIGN KEY (station_id) REFERENCES station(id);
--
-- Name: station_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_comments
    ADD CONSTRAINT station_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
--
-- Name: station_id_area_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_area_fkey FOREIGN KEY (id_area) REFERENCES station_area(id);
--
-- Name: station_id_caretaker_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_caretaker_fkey FOREIGN KEY (id_caretaker) REFERENCES contact(id);
--
-- Name: station_id_contact_as_contact_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_contact_as_contact_fkey FOREIGN KEY (id_contact_as_contact) REFERENCES contact(id);
--
-- Name: station_id_contact_as_data_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_contact_as_data_owner_fkey FOREIGN KEY (id_contact_as_data_owner) REFERENCES contact(id);
--
-- Name: station_id_contact_as_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_contact_as_owner_fkey FOREIGN KEY (id_contact_as_owner) REFERENCES contact(id);
--
-- Name: station_id_landscape_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_landscape_fkey FOREIGN KEY (id_landscape) REFERENCES station_landscape(id);
--
-- Name: station_id_network_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_network_fkey FOREIGN KEY (id_network) REFERENCES network(id);
--
-- Name: station_id_power_generation_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_power_generation_type_fkey FOREIGN KEY (id_power_generation_type) REFERENCES power_generation_type(id);
--
-- Name: station_id_surrounding_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_surrounding_fkey FOREIGN KEY (id_surrounding) REFERENCES station_surrounding(id);
--
-- Name: station_id_zone_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station
    ADD CONSTRAINT station_id_zone_fkey FOREIGN KEY (id_zone) REFERENCES zone(id);
--
-- Name: station_visit_catagory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_catagory_id_fkey FOREIGN KEY (catagory_id) REFERENCES visit_catagory(id);
--
-- Name: station_visit_reason_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_reason_id_fkey FOREIGN KEY (reason_id) REFERENCES visit_reason(id);
--
-- Name: station_visit_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_station_id_fkey FOREIGN KEY (station_id) REFERENCES station(id);
--
-- Name: station_visit_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES users(id);
--
-- Name: station_visit_user3_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_user3_id_fkey FOREIGN KEY (user3_id) REFERENCES users(id);
--
-- Name: station_visit_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY station_visit
    ADD CONSTRAINT station_visit_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
--
-- Name: audit; Type: ACL; Schema: -; Owner: postgres
--
REVOKE ALL ON SCHEMA audit FROM PUBLIC;
REVOKE ALL ON SCHEMA audit FROM postgres;
GRANT ALL ON SCHEMA audit TO postgres;
--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
SET search_path = audit, pg_catalog;
--
-- Name: logged_actions; Type: ACL; Schema: audit; Owner: postgres
--
REVOKE ALL ON TABLE logged_actions FROM PUBLIC;
REVOKE ALL ON TABLE logged_actions FROM postgres;
GRANT ALL ON TABLE logged_actions TO postgres;
GRANT SELECT ON TABLE logged_actions TO PUBLIC;
SET search_path = public, pg_catalog;
--
-- Name: antenna_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE antenna_type FROM PUBLIC;
REVOKE ALL ON TABLE antenna_type FROM postgres;
GRANT ALL ON TABLE antenna_type TO postgres;
GRANT ALL ON TABLE antenna_type TO gps;
--
-- Name: attribute; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE attribute FROM PUBLIC;
REVOKE ALL ON TABLE attribute FROM postgres;
GRANT ALL ON TABLE attribute TO postgres;
GRANT ALL ON TABLE attribute TO gps;
--
-- Name: attributes_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE attributes_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE attributes_id_seq FROM postgres;
GRANT ALL ON SEQUENCE attributes_id_seq TO postgres;
GRANT ALL ON SEQUENCE attributes_id_seq TO gps;
--
-- Name: checkcomm; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE checkcomm FROM PUBLIC;
REVOKE ALL ON TABLE checkcomm FROM postgres;
GRANT ALL ON TABLE checkcomm TO postgres;
GRANT ALL ON TABLE checkcomm TO gps;
--
-- Name: colocation_offset; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE colocation_offset FROM PUBLIC;
REVOKE ALL ON TABLE colocation_offset FROM postgres;
GRANT ALL ON TABLE colocation_offset TO postgres;
GRANT ALL ON TABLE colocation_offset TO gps;
--
-- Name: colocation_offset_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE colocation_offset_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE colocation_offset_id_seq FROM postgres;
GRANT ALL ON SEQUENCE colocation_offset_id_seq TO postgres;
GRANT ALL ON SEQUENCE colocation_offset_id_seq TO gps;
--
-- Name: contact; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE contact FROM PUBLIC;
REVOKE ALL ON TABLE contact FROM postgres;
GRANT ALL ON TABLE contact TO postgres;
GRANT ALL ON TABLE contact TO gps;
--
-- Name: contacts_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE contacts_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE contacts_id_seq FROM postgres;
GRANT ALL ON SEQUENCE contacts_id_seq TO postgres;
GRANT ALL ON SEQUENCE contacts_id_seq TO gps;
--
-- Name: document; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE document FROM PUBLIC;
REVOKE ALL ON TABLE document FROM postgres;
GRANT ALL ON TABLE document TO postgres;
GRANT ALL ON TABLE document TO gps;
--
-- Name: document_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE document_type FROM PUBLIC;
REVOKE ALL ON TABLE document_type FROM postgres;
GRANT ALL ON TABLE document_type TO postgres;
GRANT ALL ON TABLE document_type TO gps;
--
-- Name: document_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE document_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE document_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE document_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE document_types_id_seq TO gps;
--
-- Name: documents_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE documents_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE documents_id_seq FROM postgres;
GRANT ALL ON SEQUENCE documents_id_seq TO postgres;
GRANT ALL ON SEQUENCE documents_id_seq TO gps;
--
-- Name: file; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE file FROM PUBLIC;
REVOKE ALL ON TABLE file FROM postgres;
GRANT ALL ON TABLE file TO postgres;
GRANT ALL ON TABLE file TO gps;
--
-- Name: file_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE file_type FROM PUBLIC;
REVOKE ALL ON TABLE file_type FROM postgres;
GRANT ALL ON TABLE file_type TO postgres;
GRANT ALL ON TABLE file_type TO gps;
--
-- Name: file_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE file_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE file_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE file_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE file_types_id_seq TO gps;
--
-- Name: files_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE files_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE files_id_seq FROM postgres;
GRANT ALL ON SEQUENCE files_id_seq TO postgres;
GRANT ALL ON SEQUENCE files_id_seq TO gps;
--
-- Name: filter_antenna; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE filter_antenna FROM PUBLIC;
REVOKE ALL ON TABLE filter_antenna FROM postgres;
GRANT ALL ON TABLE filter_antenna TO postgres;
GRANT ALL ON TABLE filter_antenna TO gps;
--
-- Name: filter_antenna_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE filter_antenna_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE filter_antenna_id_seq FROM postgres;
GRANT ALL ON SEQUENCE filter_antenna_id_seq TO postgres;
GRANT ALL ON SEQUENCE filter_antenna_id_seq TO gps;
--
-- Name: filter_radome; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE filter_radome FROM PUBLIC;
REVOKE ALL ON TABLE filter_radome FROM postgres;
GRANT ALL ON TABLE filter_radome TO postgres;
GRANT ALL ON TABLE filter_radome TO gps;
--
-- Name: filter_radome_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE filter_radome_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE filter_radome_id_seq FROM postgres;
GRANT ALL ON SEQUENCE filter_radome_id_seq TO postgres;
GRANT ALL ON SEQUENCE filter_radome_id_seq TO gps;
--
-- Name: filter_receiver; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE filter_receiver FROM PUBLIC;
REVOKE ALL ON TABLE filter_receiver FROM postgres;
GRANT ALL ON TABLE filter_receiver TO postgres;
GRANT ALL ON TABLE filter_receiver TO gps;
--
-- Name: filter_receiver_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE filter_receiver_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE filter_receiver_id_seq FROM postgres;
GRANT ALL ON SEQUENCE filter_receiver_id_seq TO postgres;
GRANT ALL ON SEQUENCE filter_receiver_id_seq TO gps;
--
-- Name: item; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE item FROM PUBLIC;
REVOKE ALL ON TABLE item FROM postgres;
GRANT ALL ON TABLE item TO postgres;
GRANT ALL ON TABLE item TO gps;
--
-- Name: item_attribute; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE item_attribute FROM PUBLIC;
REVOKE ALL ON TABLE item_attribute FROM postgres;
GRANT ALL ON TABLE item_attribute TO postgres;
GRANT ALL ON TABLE item_attribute TO gps;
--
-- Name: item_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE item_type FROM PUBLIC;
REVOKE ALL ON TABLE item_type FROM postgres;
GRANT ALL ON TABLE item_type TO postgres;
GRANT ALL ON TABLE item_type TO gps;
--
-- Name: item_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE item_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE item_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE item_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE item_types_id_seq TO gps;
--
-- Name: items_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE items_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE items_id_seq FROM postgres;
GRANT ALL ON SEQUENCE items_id_seq TO postgres;
GRANT ALL ON SEQUENCE items_id_seq TO gps;
--
-- Name: log; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE log FROM PUBLIC;
REVOKE ALL ON TABLE log FROM postgres;
GRANT ALL ON TABLE log TO postgres;
GRANT ALL ON TABLE log TO gps;
--
-- Name: log_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE log_type FROM PUBLIC;
REVOKE ALL ON TABLE log_type FROM postgres;
GRANT ALL ON TABLE log_type TO postgres;
GRANT ALL ON TABLE log_type TO gps;
--
-- Name: log_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE log_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE log_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE log_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE log_types_id_seq TO gps;
--
-- Name: logs_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE logs_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE logs_id_seq FROM postgres;
GRANT ALL ON SEQUENCE logs_id_seq TO postgres;
GRANT ALL ON SEQUENCE logs_id_seq TO gps;
--
-- Name: network; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE network FROM PUBLIC;
REVOKE ALL ON TABLE network FROM postgres;
GRANT ALL ON TABLE network TO postgres;
GRANT ALL ON TABLE network TO gps;
--
-- Name: networks_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE networks_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE networks_id_seq FROM postgres;
GRANT ALL ON SEQUENCE networks_id_seq TO postgres;
GRANT ALL ON SEQUENCE networks_id_seq TO gps;
--
-- Name: power_generation_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE power_generation_type FROM PUBLIC;
REVOKE ALL ON TABLE power_generation_type FROM postgres;
GRANT ALL ON TABLE power_generation_type TO postgres;
GRANT ALL ON TABLE power_generation_type TO gps;
--
-- Name: power_generation_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE power_generation_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE power_generation_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE power_generation_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE power_generation_types_id_seq TO gps;
--
-- Name: radome_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE radome_type FROM PUBLIC;
REVOKE ALL ON TABLE radome_type FROM postgres;
GRANT ALL ON TABLE radome_type TO postgres;
GRANT ALL ON TABLE radome_type TO gps;
--
-- Name: station; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE station FROM PUBLIC;
REVOKE ALL ON TABLE station FROM postgres;
GRANT ALL ON TABLE station TO postgres;
GRANT ALL ON TABLE station TO gps;
--
-- Name: station_colocation; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE station_colocation FROM PUBLIC;
REVOKE ALL ON TABLE station_colocation FROM postgres;
GRANT ALL ON TABLE station_colocation TO postgres;
GRANT ALL ON TABLE station_colocation TO gps;
--
-- Name: station_colocation_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE station_colocation_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE station_colocation_id_seq FROM postgres;
GRANT ALL ON SEQUENCE station_colocation_id_seq TO postgres;
GRANT ALL ON SEQUENCE station_colocation_id_seq TO gps;
--
-- Name: station_item; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE station_item FROM PUBLIC;
REVOKE ALL ON TABLE station_item FROM postgres;
GRANT ALL ON TABLE station_item TO postgres;
GRANT ALL ON TABLE station_item TO gps;
--
-- Name: station_type; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE station_type FROM PUBLIC;
REVOKE ALL ON TABLE station_type FROM postgres;
GRANT ALL ON TABLE station_type TO postgres;
GRANT ALL ON TABLE station_type TO gps;
--
-- Name: station_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE station_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE station_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE station_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE station_types_id_seq TO gps;
--
-- Name: stations_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE stations_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE stations_id_seq FROM postgres;
GRANT ALL ON SEQUENCE stations_id_seq TO postgres;
GRANT ALL ON SEQUENCE stations_id_seq TO gps;
--
-- Name: stations_items_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE stations_items_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE stations_items_id_seq FROM postgres;
GRANT ALL ON SEQUENCE stations_items_id_seq TO postgres;
GRANT ALL ON SEQUENCE stations_items_id_seq TO gps;
--
-- Name: user_group; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE user_group FROM PUBLIC;
REVOKE ALL ON TABLE user_group FROM postgres;
GRANT ALL ON TABLE user_group TO postgres;
GRANT ALL ON TABLE user_group TO gps;
--
-- Name: user_group_station; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE user_group_station FROM PUBLIC;
REVOKE ALL ON TABLE user_group_station FROM postgres;
GRANT ALL ON TABLE user_group_station TO postgres;
GRANT ALL ON TABLE user_group_station TO gps;
--
-- Name: user_groups_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE user_groups_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE user_groups_id_seq FROM postgres;
GRANT ALL ON SEQUENCE user_groups_id_seq TO postgres;
GRANT ALL ON SEQUENCE user_groups_id_seq TO gps;
--
-- Name: user_groups_stations_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE user_groups_stations_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE user_groups_stations_id_seq FROM postgres;
GRANT ALL ON SEQUENCE user_groups_stations_id_seq TO postgres;
GRANT ALL ON SEQUENCE user_groups_stations_id_seq TO gps;
--
-- Name: zone; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON TABLE zone FROM PUBLIC;
REVOKE ALL ON TABLE zone FROM postgres;
GRANT ALL ON TABLE zone TO postgres;
GRANT ALL ON TABLE zone TO gps;
--
-- Name: zone_types_id_seq; Type: ACL; Schema: public; Owner: postgres
--
REVOKE ALL ON SEQUENCE zone_types_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE zone_types_id_seq FROM postgres;
GRANT ALL ON SEQUENCE zone_types_id_seq TO postgres;
GRANT ALL ON SEQUENCE zone_types_id_seq TO gps;
--
-- PostgreSQL database dump complete
--
