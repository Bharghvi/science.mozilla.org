import React from "react";
import DataCard from "../../components/data-card/data-card.jsx";
import Moment from "moment-timezone";
import {Link} from "react-router";
import Humanize from "../../../js/humanize-dates.js";

export default class EventList extends React.Component {

  state = {
    timeZone: ``
  };

  static propTypes = {
    events: React.PropTypes.array,
    pictures: React.PropTypes.bool,
    cardClass: React.PropTypes.string
  };

  static defaultProps = {
    events: [],
    pictures: true,
    cardClass: `col-sm-6`
  };

  componentDidMount() {
    this.setState({ timeZone: Moment.tz.guess() });
  }

  render() {

    return (
      <div className="row">
        {this.props.events.map((event) => {

          var timezone;

          if(event.is_virtual) {
            timezone = this.state.timeZone;
          } else {
            timezone = event.timezone;
          }

          return (
            <DataCard key={event.id} className={`${this.props.cardClass} event-card`} showPicture={this.props.pictures} picture={event.image_url} categories={[Humanize.calculateDate(event.starts_at, event.ends_at, this.timeZone)]}>
              <div className="event-card-data">
                <h3 className="event-title"><Link to={`/programs/events/${event.slug}`}>{event.name}</Link></h3>
                <div className="event-details">
                  <span className="event-location">{event.location}</span>
                  <span className="event-time">{Humanize.calculateTime(event.starts_at, event.ends_at, timezone) }</span>
                </div>
                <div>{event.short_description}</div>
                <Link to={`/programs/events/${event.slug}`} className="btn btn-outline-info mt-1">Details</Link>
              </div>
            </DataCard>
          );
        }) }
      </div>
    );
  }
}
