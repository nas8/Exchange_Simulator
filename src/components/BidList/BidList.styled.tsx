import styled from 'styled-components';

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    box-sizing: border-box;
    border-spacing: 0;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.4);
    width: 750px;
    min-height: 100px;

    margin-bottom: 20px;

    tr {
      td {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 0.5rem;

    input,
    select {
      border-radius: 3px;
    }
  }
`;
