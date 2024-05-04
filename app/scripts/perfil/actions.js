import postImage from "@/app/lib/cloudinaryActions";

export const handleInputChange = (e) => {
	setUnmodified(false);
	const { name, value } = e.target;
	if (name == 'telefono' && value < 0) {
		return;
	}
	setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
};
export const handleEstadoChange = (e) => {
	setUnmodified(false);
	const { name, value } = e.target;
	setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	// Reset selected municipio when estado user
	setUser((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
	e.target.value
		? (document.getElementById('municipio').disabled = false)
		: (document.getElementById('municipio').disabled = true);
};

//actualizacion de imagen
export const uploadToClient = (event) => {
	if (event.target.files && event.target.files[0]) {
		setUnmodified(false);
		const i = event.target.files[0];

		setImage(i);
		setCreateObjectURL(URL.createObjectURL(i));
	}
};

export const modifyAdoptante = async (e) => {
	e.preventDefault();
	if (!user.correo || !user.telefono || !user.municipio || user.telefono) {
		setInvalidFieldsDialog(true);
	} else {
		try {
			const body = new FormData();
			BigInt.prototype.toJSON = function () {
				return this.toString();
			};
			body.set('user', JSON.stringify(user));
			body.set('userType', JSON.stringify(userType));
			body.set('userInit', JSON.stringify(props.user));

			if (image) {
				postImage(body, image)
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/adoptante', {
				method: 'PUT',
				body,
			});
			if (response.status == 200) {
				setModifiedDialog(true);
				response.json().then((response) => setCookie('token', response.token));
				router.refresh();
				setUnmodified(true);
			} else {
				response.json().then((res) => console.log(res.message));
				setErrorDialog(true);
			}
		} catch (error) {
			console.log(error);
			setErrorDialog(true);
		}
	}
};

export const modifyEmpleado = async (e) => {
	e.preventDefault();
	//field validation
	if (userType == 2) {
		if (!user.correo || !user.telefono) {
			setInvalidFieldsDialog(true);
			return;
		}
	} else if (userType == 3) {
		if (
			!user.nombre ||
			!user.apellido ||
			!user.correo ||
			!user.telefono ||
			!user.fechaRegistro
		) {
			setInvalidFieldsDialog(true);
			return;
		}
	}

	try {
		const body = new FormData();
		BigInt.prototype.toJSON = function () {
			return this.toString();
		};
		body.set('user', JSON.stringify(user));
		body.set('userType', JSON.stringify(userType));
		body.set('userInit', JSON.stringify(props.user));
		if (userType == 3) {
			if (image) {
				postImage(body, image);
			} else {
				body.set('image', null);
			}
		}

		const response = await fetch('/api/empleado', {
			method: 'PUT',
			body,
		});
		if (response.status == 200) {
			setModifiedDialog(true);
			response.json().then((response) => setCookie('token', response.token));
			router.refresh();
		} else {
			response.json().then((res) => console.log(res.message));
			setErrorDialog(true);
			setUnmodified(true);
		}
	} catch (error) {
		console.log(error);
		setErrorDialog(true);
	}
};

export const deleteAdoptante = async (e) => {
	setWarningDialog(false);
	const id = id;
	const params = JSON.stringify({ id, userType });
	const response = await fetch(`/api/adoptante?params=${params}`, {
		method: 'DELETE',
	});
	if (response.status == 200) {
		setDeletedDialog(true);
		router.replace('/login');
	} else if (response.status == 409) {
		setAdopcionDialog(true);
	} else {
		response.json().then((res) => console.log(res.message));
		setErrorDialog(true);
	}
};
export const warning = (e) => {
	e.preventDefault();
	setWarningDialog(true);
};
