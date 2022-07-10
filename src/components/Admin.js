import React, { useState, useEffect } from "react";
import {
	doc,
	deleteDoc,
	collection,
	getDocs,
	setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { db, onSnapshot, storage } from "../firebase";
import AdminCard from "./AdminCard";
import Loading from "./Loading";

const Admin = () => {
	const [type, setType] = useState("blogs");
	const [data, setData] = useState([]);
	const [searched, setSearched] = useState([]);
	let show = searched.length ? searched : data;
	const navigate = useNavigate();
	useEffect(() => {
		getData();
		setSearched([]);
	}, [type]);

	const getData = async () => {
		const querySnapshot = await getDocs(collection(db, type));
		let dataArry = [];
		querySnapshot.forEach((doc) => {
			dataArry.push(doc.data());
		});
		setData([...dataArry]);
	};
	const handleDelete = async (id, item) => {
		await deleteDoc(doc(db, type, id));
		if (type === "blogs") {
			setData(data.filter((item) => item.item_id != id));
		} else if (type === "places") {
			setData(data.filter((item) => item.place_id != id));
		} else {
			await setDoc(doc(db, "banned_users", item.email), {
				...item,
			});

			setData(data.filter((item) => item.uid != id));
		}
	};
	const handleSearch = (e) => {
		let matches = data.filter((item) => {
			const regex = new RegExp(`^${e.target.value}`, "gi");

			if (type === "blogs") {
				return item.title.match(regex);
			} else if (type === "places") {
				return item.desc.match(regex);
			} else {
				return item.first_name.match(regex) || item.last_name.match(regex);
			}
		});
		setSearched(matches);
	};
	const handleEdit = (item) => {
		let content = JSON.stringify(item.blog_text);

		localStorage.clear();
		localStorage.setItem("title", item.title);
		localStorage.setItem("blog-id", item.item_id);

		localStorage.setItem("blog-ui", content);
		item.blog_text.forEach((text) => {
			if (text.type === "1") {
				let content = JSON.stringify(text.content);
				localStorage.setItem(`content${text.pos}`, content);
			}
		});

		navigate("/blog/write");
		// console.log(item.blog_text);
	};
	return (
		<div className='admin'>
			{!data.length && <Loading />}
			<div className='place-header'>
				<ul>
					<li
						onClick={() => setType("blogs")}
						className={type == "blogs" ? "active-category" : ""}
					>
						Blogs
					</li>
					<li
						onClick={() => setType("places")}
						className={type == "places" ? "active-category" : ""}
					>
						Places
					</li>

					<li
						onClick={() => setType("users")}
						className={type == "users" ? "active-category" : ""}
					>
						Users
					</li>
				</ul>
			</div>
			<div className='search-bar'>
				<p>Search in {type}</p>
				<div className='bar'>
					<input
						type='text'
						id='blog-search'
						placeholder='Enter the city'
						onChange={handleSearch}
					/>
					<i className='fas fa-search-location'></i>
				</div>
			</div>
			<div className='data-list'>
				{data.length &&
					show.map((item, index) => {
						if (type === "blogs") {
							return (
								<div className='admin-card' key={index}>
									<p>{item.title}</p>{" "}
									<div className='action'>
										<i
											className='fas fa-pen'
											onClick={() => handleEdit(item)}
										></i>
										<i
											className='fas fa-trash'
											onClick={() => handleDelete(item.item_id)}
										></i>
									</div>
								</div>
							);
						} else if (type === "places") {
							return (
								<div className='admin-card' key={index}>
									<p>{item.desc}</p>{" "}
									<div className='action'>
										<i
											className='fas fa-pen'
											onClick={() => handleEdit(item.place_id)}
										></i>
										<i
											className='fas fa-trash'
											onClick={() => handleDelete(item.place_id)}
										></i>
									</div>
								</div>
							);
						} else {
							return (
								<div className='admin-card' key={index}>
									<div className='name-email'>
										<p>
											{item.first_name} {item.last_name}
										</p>{" "}
										<p>{item.email}</p>
									</div>

									<div className='action'>
										<i
											className='fas fa-ban'
											onClick={() => handleDelete(item.uid, item)}
										></i>
									</div>
								</div>
							);
						}
					})}
			</div>
		</div>
	);
};

export default Admin;
