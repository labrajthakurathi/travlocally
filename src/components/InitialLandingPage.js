import Soon from "../images/coming-soon.png";
const InitialLandingPage = () => {
	return (
		<div className='home'>
			<div className='bg'>
				{" "}
				<div className='overlay'>
					<h1>ANYWHERE YOU GO, Eat, Live, and Explore Like a Local</h1>
					<h3>Experience what local do and recommend</h3>
				</div>
			</div>
			<div className='coming-soon'>
				<img src={Soon} alt='' />
			</div>
		</div>
	);
};

export default InitialLandingPage;
