import React, { useCallback, useEffect, useState } from "react";
import MainCard from "../../../../shared/MainCard";
import ROUTES_NAVIGATION from "../../../../../routes/routes";
import CustomTab from "../../../../shared/CustomTab";
import "./LeadSource.scss";
import { COMPAIGN_DATA, PUBLISHER_DATA, SOURCE_DATA } from "./defaultData";
import CustomButton from "../../../../shared/CustomButton";
import CustomModal from "../../../../shared/CustomModal";
import SourceTableList from "./SourceTableList";
import PublisherTableList from "./PublisherTableList";
import CampaignTable from "./CampaignTable";
import CustomDropdown from "../../../../shared/CustomDropdown";
import { Campaign, Publisher, Source } from "./addJsonData";
import {
  APIMasterCampaignDelete,
  APIMasterCampaignList,
  APIMasterPublisherCreate,
  APIMasterPublisherDelete,
  APIMasterPublisherList,
  APIMasterPublisherUpdate,
  APIMasterSourceDelete,
  APIMasterSourceId,
  APIMasterSourceList,
  APIMasterPublisherGetbyID,
  APIMasterCampaignId,
  APIMasterCampaignCreate,
  APIMasterCampaignUpdate,
  APIMasterSourceCreate,
  APIMasterSourceUpdate,
} from "../../../../../api/common";
import AddSourceComponent from "./AddSourceComponent";
import GenerateApiComponent from "./GenerateApiComponent";
import AddPublisherComponent from "./AddPublisherComponent";
import AddCampaignComponent from "./AddCampaignComponent";
import { LeadModalType } from "./LeadModalType";

const TAB_LIST = [
  { id: "source", label: "Source" },
  { id: "publisher", label: "Publisher" },
  { id: "campaign", label: "Campaign" },
];

const PageRoutes = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Master Data",
  },
  {
    // path: ROUTES_NAVIGATION.VEHICLE_INSURENCE_LEAD_SOURCE_DATA,
    label: "Lead Sources",
  },
];
const LeadSource = () => {
  const [activeTab, setActiveTab] = useState(TAB_LIST[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateAPI, setIsGenerateAPI] = useState(false);
  const [tags, setTags] = useState(["lorem", "ipsum"]);
  const [tableLoader, setTableLoader] = useState(false);
  const [sourceData, setSourceData] = useState([]);
  const [publisherData, setPublisherData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [editedRow, setEditedRow] = useState();
  const [deleteRow, setDeleteRow] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  // const [selectedTab,setSelectedTab]=useState("source")

  const notification =(message)=>{
    setTimeout(() => {
      
    }, 1000);
    return(
      <div>
      <CustomModal 
      notify={{
        backgroundColor:"none",
        justifyContent:"center"
      }}>
      </CustomModal>
      </div>
    )
  }

  const APIMasterSourcehandler = useCallback(async () => {
    setTableLoader(true);
    const resp = await APIMasterSourceList();
    setTableLoader(false);
    if (resp?.ok) {
      setSourceData(resp?.data?.data);
    } else {
      setSourceData([]);
    }
  }, []);

  const APIMasterPublisherHandler = useCallback(async () => {
    setTableLoader(true);
    const resp = await APIMasterPublisherList();
    setTableLoader(false);
    if (resp?.ok) {
      setPublisherData(resp?.data?.data);
    } else {
      setPublisherData([]);
    }
  }, []);

  const APIMasterCampaignHandller = useCallback(async () => {
    setTableLoader(true);
    const resp = await APIMasterCampaignList();
    setTableLoader(false);
    if (resp?.ok) {
      setCampaignData(resp?.data?.data);
    } else {
      setCampaignData([]);
    }
  }, []);

  const handleOpenModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (editedRow) {
      setEditedRow(null);
    }
  };

  const handleOpenDeleteModal = (type) => {
    setShowDeleteModal(true);
    setModalType(type);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    if (deleteRow) {
      setDeleteRow(null);
    }
  };
  const handleSaveLead = () => {
    if (editedRow) {
      setEditedRow(null);
    }
    setIsModalOpen(false);
    reloadTableList();
  };

  const reloadTableList = () => {
    setReloadData((prev) => !prev);
  };
  // const fetchSourceById = async (editRow) => {
  //   try {
  //     const result = await APIMasterSourceId(editRow.leadSourceTypeId);
  //     console.log("@@@", result);
  //     if (result?.ok) {
  //       setEditedRow({
  //         ...result?.data?.data,
  //         SourceName:
  //           result?.data?.data["SourceName"] ||
  //           result?.data?.data["leadSourceName"],
  //       });
  //     } else {
  //       setEditedRow(null);
  //     }
  //   } catch (err) {
  //     console.error("Error in getById source master", err);
  //   }
  // };
  const fetchPublisherById = async (editRow) => {
    try {
      const result = await APIMasterPublisherGetbyID(editRow?.publisherId);
      if (result?.ok) {
        setEditedRow({
          ...result?.data?.data,
          name: result?.data?.data?.name || result?.data?.data?.publisherName,
          publisherId:
            result?.data?.data?.publisherId ||
            result?.data?.data?.publisherTypeId,
        });
      } else {
        setEditedRow(null);
      }
    } catch (err) {
      console.error("Error in getById publisher master", err);
    }
  };

  const fetchCampaignById = async (editRow) => {
    try {
      const result = await APIMasterCampaignId(editRow?.campaign_type_id);
      if (result?.ok) {
        setEditedRow({
          ...result?.data?.data,
          name: result?.data?.data?.name || result?.data?.data?.campaignName,
        });
      } else {
        setEditedRow(null);
      }
    } catch (err) {
      console.error("Error in getById source master", err);
    }
  };

  const handleRowEdit = useCallback(
    async (editRow, type) => {
      console.log("edit Value", editRow, type);
      try {
        switch (type) {
          case LeadModalType.source:
            setEditedRow({...editRow})
            break;
          case LeadModalType.publisher:
            await fetchPublisherById(editRow);
            break;
          case LeadModalType.campaign:
            await fetchCampaignById(editRow);
            break;
          default:
            break;
        }
        handleOpenModal(type);
      } catch (err) {
        console.log("Error on get by ID", err);
        alert("Data Not Found");
      }
    },
    [editedRow, modalType]
  );

  const handleRowDelete = (deletingRow, type) => {
    console.log(deletingRow, type);
    setDeleteRow(deletingRow);
    handleOpenDeleteModal(type);
  };

  
  // const handleSaveSource = useCallback(
  //   async (formData) => {
  //     console.log("form data source", formData);

  //     // api call to save formData
  //     try {
  //       let resultAPI;
  //       if (!editedRow?.leadSourceTypeId) {
  //         resultAPI = await APIMasterSourceCreate(formData);
  //       } else {
  //         resultAPI = await APIMasterSourceUpdate(
  //           editedRow?.leadSourceTypeId,
  //           formData
  //         );
  //       }

  //       if (resultAPI?.data?.status_code === 200) {
  //         console.log("resultAPI", resultAPI?.data?.code);
  //         handleCloseModal();
  //         reloadTableList();
  //       } else {
  //         console.log("status:", resultAPI?.data?.code);
  //         alert(resultAPI?.data.message);
  //       }
  //     } catch (err) {
  //       console.log("Error on the source saving", err);
  //     }
  //   },
  //   [editedRow, activeTab.id, handleCloseModal]
  // );
  const handleSavePublisher = useCallback(
    async (formData) => {
      try {
        let resultAPI;
        if (!editedRow?.publisherId) {
          resultAPI = await APIMasterPublisherCreate(formData);
        } else {
          resultAPI = await APIMasterPublisherUpdate(
            editedRow?.publisherId,
            formData
          );
        }
        if (resultAPI?.data?.status_code === 200) {
          console.log("resultAPI", resultAPI?.data?.code);
          handleCloseModal();
          reloadTableList();
        } else {
          console.log("status:", resultAPI?.data?.code);
          alert(resultAPI?.data.message);
        }
      } catch (err) {
        console.log("Error on creating the source", err);
      }
    },
    [editedRow, activeTab?.id, handleCloseModal]
  );

  const handleSaveCampaign = useCallback(
    async (formData) => {
   
      // api call to save formData

      try {
        let resultAPI;
        if (!editedRow) {
          resultAPI = await APIMasterCampaignCreate(formData);
        } else {
          resultAPI = await APIMasterCampaignUpdate(
            editedRow?.campaignTypeId,
            formData
          );
        }
        if (resultAPI?.data?.status_code === 200) {
          console.log("resultAPI", resultAPI?.data?.code);
          handleCloseModal();
          reloadTableList();
        } else {
          console.log("status:", resultAPI?.data?.code);
          alert(resultAPI?.data.message);
        }
      } catch (err) {
        console.log("Error on creating the source", err);
      }
    },
    [editedRow, activeTab?.id, handleCloseModal]
  );

  

  const handleDeleteSource = async () => {
    try {
      const result = await APIMasterSourceDelete(deleteRow?.leadSourceTypeId);
      if (result?.ok) {
        console.log(`Delete source ${deleteRow?.SourceName}`);
        handleCloseDeleteModal();
        reloadTableList();
      }
    } catch (err) {
      console.error(`Error in delete leadSource `, err);
    }
  };
  const handleDeletePublisher = async () => {
    try {
      const result = await APIMasterPublisherDelete(deleteRow?.publisherId);
      if (result?.ok) {
        console.log(`Delete source ${deleteRow?.publisherName}`);
        handleCloseDeleteModal();
        reloadTableList();
      }
    } catch (err) {
      console.error(`Error in delete leadSource `, err);
    }
  };
  const handleDeleteCampaign = async () => {
    try {
      const result = await APIMasterCampaignDelete(deleteRow?.campaign_type_id); // change to campaignId
      if (result?.ok) {
        console.log(`Delete source ${deleteRow?.campaignName}`);
        handleCloseDeleteModal();
        reloadTableList();
      }
    } catch (err) {
      console.error(`Error in delete leadSource `, err);
    }
  };
  const handleDeleteLead = async () => {
    try {
      switch (modalType) {
        case LeadModalType.source:
          await handleDeleteSource();
          break;
        case LeadModalType.campaign:
          // handleCampaign delete api
          await handleDeleteCampaign();
          break;
        case LeadModalType.publisher:
          // handlePublisher delete api
          await handleDeletePublisher();
          break;
      }
    } catch (err) {
      console.error(`Error in deleting lead ${modalType}`);
    }
  };

  const renderButtons = () => {
    switch (activeTab?.id) {
      case LeadModalType.source:
        return (
          <div className="d-flex gap-2">
            <CustomButton
              className={" addSourceBtn rounded-2"}
              onClick={() => handleOpenModal(LeadModalType.source)}
            >
              Add Source
              <i className="bi bi-plus ms-2"></i>
            </CustomButton>
            <CustomButton
              className={"addSourceBtn rounded-2"}
              onClick={() => handleOpenModal(LeadModalType.generateApi)}
            >
              Generate API
              <i className="bi bi-code-square ms-2"></i>
            </CustomButton>
          </div>
        );
      case LeadModalType.publisher:
        return (
          <div className="d-flex gap-2">
            <CustomButton
              className={"addSourceBtn rounded-2"}
              onClick={() => handleOpenModal(LeadModalType.publisher)}
            >
              Add Publisher
              <i className="bi bi-plus ms-2"></i>
            </CustomButton>
          </div>
        );
      case LeadModalType.campaign:
        return (
          <div className="d-flex gap-2">
            <CustomButton
              className={" addSourceBtn rounded-2"}
              onClick={() => handleOpenModal(LeadModalType.campaign)}
            >
              Add Campaign
              <i className="bi bi-plus ms-2"></i>
            </CustomButton>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    let modalTitle =
      modalType === LeadModalType.source
        ? "Lead Source"
        : modalType === LeadModalType.generateApi
        ? "Generate API"
        : modalType === LeadModalType.publisher
        ? "Publisher"
        : modalType === LeadModalType.campaign
        ? "Campaign"
        : "";
    return `${
      isModalOpen
        ? editedRow
          ? "Edit"
          : "Add"
        : showDeleteModal
        ? "Delete"
        : ""
    } ${modalTitle}`;
  };

  const renderModalContent = useCallback(() => {
    switch (modalType) {
      case LeadModalType.source:
        return (
          <AddSourceComponent
            handleCloseModal={handleCloseModal}
            handleSaveSource={handleSaveLead}
            editedRow={editedRow}
          />
        );
      case LeadModalType.generateApi:
        return <GenerateApiComponent handleCloseModal={handleCloseModal} />;
      case LeadModalType.publisher:
        return (
          <AddPublisherComponent
            handleSavePublisher={handleSavePublisher}
            handleCloseModal={handleCloseModal}
            editedRow={editedRow}
          />
        );
      case LeadModalType.campaign:
        return (
          <AddCampaignComponent
            handleSaveCampaign={handleSaveCampaign}
            handleCloseModal={handleCloseModal}
            editedRow={editedRow}
          />
        );
      default:
        return null;
    }
  }, [modalType, editedRow]);

  const renderDeleteModalContent = () => {
    let deleteDataEl = null;
    switch (modalType) {
      case LeadModalType.source:
        deleteDataEl = <span>{deleteRow?.SourceName}</span>;
        break;
      case LeadModalType.publisher:
        deleteDataEl = <span>{deleteRow?.publisherName}</span>;
        break;
      case LeadModalType.campaign:
        deleteDataEl = <span>{deleteRow?.campaignName}</span>;
        break;
      default:
        deleteDataEl = null;
        break;
    }
    return (
      <>
        <h3>
          Are you sure, want to delete {modalType} - {deleteDataEl}
        </h3>
        <div className="form-button-main d-flex justify-content-end gap-2">
          <CustomButton
            className={"view-template-btn"}
            onClick={handleCloseDeleteModal}
            type="button"
          >
            <span className="view-btn ">Discard</span>
          </CustomButton>
          <CustomButton
            className={"report-download-btn btn-danger"}
            type="button"
            onClick={handleDeleteLead}
          >
            <span className="download-btn ">Delete</span>
          </CustomButton>
        </div>
      </>
    );
  };

  const renderTabContent = useCallback(() => {
    console.log("rendering tab content");
    if (!tableLoader) {
      switch (activeTab?.id) {
        case LeadModalType.source:
          return (
            <SourceTableList
              tableRow={sourceData}
              handleRowEdit={handleRowEdit}
              handleRowDelete={handleRowDelete}
            />
          );
        case LeadModalType.publisher:
          return (
            <PublisherTableList
              tableRow={publisherData}
              handleRowEdit={handleRowEdit}
              handleRowDelete={handleRowDelete}
            />
          );
        case LeadModalType.campaign:
          return (
            <CampaignTable
              tableRow={campaignData}
              handleRowEdit={handleRowEdit}
              handleRowDelete={handleRowDelete}
            />
          );
        default:
          return null;
      }
    }
  }, [activeTab?.id, tableLoader]);

  useEffect(() => {
    if (activeTab?.id === LeadModalType.source) {
      APIMasterSourcehandler();
    } else if (activeTab?.id === LeadModalType.publisher) {
      APIMasterPublisherHandler();
    } else if (activeTab?.id === LeadModalType.campaign) {
      APIMasterCampaignHandller();
    }
  }, [
    APIMasterSourcehandler,
    activeTab?.id,
    reloadData,
    APIMasterCampaignHandller,
    APIMasterPublisherHandler,
  ]);

  return (
    <>
      <MainCard
        title="Lead Sources"
        pageRoutes={PageRoutes}
        isBack
        activeButtons={renderButtons()}
      >
        <div className="card mb-4">
          <div className="leadSourceHeader">
            <CustomTab
              tabList={TAB_LIST}
              onClick={(tab) => setActiveTab(tab)}
              expandStyle={{ width: "100%",gap:"0" }}
              style={{ width: "100%",borderBottom:"1px solid rgb(187, 186, 187)",maxWidth:"100%"}}
              activeTab={activeTab}
            />
          </div>
          {renderTabContent()}
        </div>
      </MainCard>
      <CustomModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        title={getModalTitle()}
        style={{
          width: 500,
        }}
        buttonsave="Save"
        buttonclose="Close"
      >
        {renderModalContent()}
      </CustomModal>

      <CustomModal
        show={showDeleteModal}
        title={getModalTitle()}
        handleClose={handleCloseDeleteModal}
      >
        {renderDeleteModalContent()}
      </CustomModal>
    </>
  );
};

export default LeadSource;

