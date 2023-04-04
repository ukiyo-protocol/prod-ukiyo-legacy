import Modal from 'react-bootstrap/Modal';
import "./ClaimTokenModal.scss";
// import TimerSection from '../Timer/TimerSection';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useAppDispatch } from '../../../hooks/hooks';

const ClaimTokenModal = ({ showModal, handleCloseModal, userMapping, metaEastTokenDetails, userDetails, onInit, expirationsTime, vestingUserMapping, vestingStartTime, userTgeClaimAmount, tgeStartTime }: any) => {
  const dispatch = useAppDispatch();
  



  return (
    <Modal centered className='connect_wallet claimToken_Modal' show={showModal} onHide={handleCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>Claim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          Number(vestingUserMapping?.totalAmount) > 0 || (userTgeClaimAmount > 0 ) ? (
            <>
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3 tabs_sec"
                // onSelect={handleTabSelect}
              >
                <Tab eventKey="home" title="Seed Claim">
                  <div className="claimToken_Content">
                    <ul className='claimToken_list'>
                      {/* {metaClaimData.map((item) => {
                        return (
                          <li className='d-flex align-items-center justify-content-between'>
                            <h4>{item.title}</h4> <span> {item.value}</span>
                          </li>
                        )
                      })} */}
                    </ul>
                    {/* <ButtonCustom title="Claim" /> */}
                    {/* <div className='mt-4'>
                <TimerSection className="token_timer" />
              </div> */}
                    {/* {
                      Number(userMapping?.tokenToBeTransfer) > 0 ?
                        (
                          <ButtonCustom className="mt-4 w-100" title="Claim Now" onClick={(event: React.MouseEvent) => claimHandler(event)} />)
                        : (
                          <>
                            <ButtonCustom className="mt-4 w-100" title="Claim Now" disabled={true} />

                            <p className='text-center pt-4'>
                              <h3>Claim feature will be activated after 2 months of ICO sale</h3>
                            </p>
                          </>
                        )
                    } */}
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Vesting Claim">
                  <div className="claimToken_Content">
                    <ul className='claimToken_list'>
                      {/* {vestingData.map((item) => {
                        return (
                          <li className='d-flex align-items-center justify-content-between'>
                            <h4>{item.title}</h4> <span> {item.value}</span>
                          </li>
                        )
                      })} */}
                    </ul>
                    {/* <ButtonCustom title="Claim" /> */}

                    {/* <div className='mt-4'>
                <TimerSection className="token_timer" />
              </div> */}
                    {/* <ButtonCustom className="mt-4 w-100" title="Claim Now" onClick={(event: React.MouseEvent) => claimVestingHandler(event)} />
                    {
                      userTgeClaimAmount > 0 && enableTge ? (
                        <ButtonCustom className="mt-4 w-100" title="Claim TGE" onClick={(event: React.MouseEvent) => claimTgeAfterVestingHandler(event)} />

                      ) : null
                    } */}
                  </div>
                </Tab>
              </Tabs>
            </>
          ) : (
            <>
              <div className="claimToken_Content">
                <ul className='claimToken_list'>
                  {/* {metaClaimData.map((item) => {
                    return (
                      <li className='d-flex align-items-center justify-content-between'>
                        <h4>{item.title}</h4> <span> {item.value}</span>
                      </li>
                    )
                  })} */}
                </ul>
                {/* <ButtonCustom title="Claim" /> */}
                {/* <div className='mt-4'>
                <TimerSection className="token_timer" />
              </div> */}

                {/* {
                    Number(userMapping?.tokenToBeTransfer) > 0 ?
                    (
                      <ButtonCustom className="mt-4 w-100" title="Claim Now" onClick={(event: React.MouseEvent) => claimHandler(event)} />)
                    : (
                      <>
                        <ButtonCustom className="mt-4 w-100" title="Claim Now" disabled={true} />

                        <p className='text-center pt-4'>
                          <h3>Claim feature will be activated after 2 months of ICO sale</h3>
                        </p>
                      </>
                    )
                } */}
              </div>
              </>
            )
        }
      </Modal.Body>
    </Modal>
  );
};

export default ClaimTokenModal;

// className="connect_wallet buy_token"