import { gql } from '@apollo/client';

export const GET_ORGS = gql`
  query getOrganizations($page: PageInput!) {
    getOrganizations(page: $page){
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        logo
        name
        address
        tags
      }
    }
  }
`;

export const GET_SAMPLE_ORGS = gql`
  query getOrganizations($page: PageInput!, $name: String) {
    getOrganizations(page: $page, name: $name){
      code
      message
      data {
        id
        name
      }
    }
  }
`;

export const GET_ORG = gql`
query getOrganizationInfo(
  $id: String!
  ) {
    getOrganizationInfo(id: $id) {
      data {
        description
        name
        tags
        id
        orgFrontImg {
          url
        }
        orgRoomImg {
          url
        }
        orgOtherImg {
          url
        }
        logo
        address
        tel
        longitude
        latitude
        identityCardBackImg
        identityCardFrontImg
        businessLicense
      }
      code
      message
  }
}
`;

export const COMMIT_ORG = gql`
  mutation commitOrganization($params: OrganizationInput!, $id: String) {
    commitOrganization(params: $params, id: $id) {
      code
      message
    }
  }
`;

export const DEL_ORG = gql`
  mutation deleteOrganization($id: String!) {
    deleteOrganization(id: $id) {
      code
      message
    }
  }
`;
