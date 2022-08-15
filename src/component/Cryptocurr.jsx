import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurr = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filterdData = cryptoList?.data?.coins.filter((coins) =>
      coins.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterdData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((curr) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={curr.uuid}>
            <Link to={`/crypto/${curr.uuid}`}>
              <Card
                title={`${curr.rank}. ${curr.name}`}
                extra={<img className="crypto-image" src={curr.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(curr.price)}</p>
                <p>Market Cap: {millify(curr.marketCap)}</p>
                <p>Daily Change: {millify(curr.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurr;
