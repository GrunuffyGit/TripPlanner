import React, {useState, useEffect} from 'react';
import { Row, Button, Col } from 'reactstrap';
import { useAuth0 } from "../react-auth0-spa";
import { getPlans } from '../utils/apiCalls';
import PlanCard from '../components/PlanCards';
import PlanForm from '../components/PlanForm';

const AllMyPlans = () =>{
  const { loading, user } = useAuth0();
  const [plans, setPlans] = useState();
  const [modal, setModal] = useState(false);
  
  const openModal = () => {
    setModal(!modal);
  }
  const getAllPlans = async() => {
    const getPlansCall = await getPlans(user.sub);
    setPlans(getPlansCall);
  }
  useEffect(()=>{
    if(user){
      getAllPlans();
    }
  },[user])
  
  if (!user && !loading) {
    return (
    <div className="App">
      <h1>Please Login to view this page.</h1>
    </div>);
  }else if(loading){
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>);
  }
  
  return(
    <div className="App">
      <Row id="allPlansHeader">
        <Col>
          <h1 id="allPlanHeader"> My Plans </h1>
        </Col>
        <Col>
          <Button id="createPlanBtn" size="lg" onClick={openModal}> Create Plan</Button>
        </Col>
      </Row>
      <PlanForm user={user} update={getAllPlans} isModalOpen={modal} toggle={openModal}/>
      <Row id="planCardRow">
        {plans ? plans.map(plan =>(<PlanCard key={plan.id} plan={plan} update={getAllPlans}/>)): "No Plans"}
      </Row>
    </div>
  );
}

export default AllMyPlans;