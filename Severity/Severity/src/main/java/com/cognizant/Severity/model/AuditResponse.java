package com.cognizant.Severity.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "audit_response")
public class AuditResponse {
//    @GeneratedValue
//    private int id;

    private int emp_id;
    private int audit_id;

    @Id
    private String audit_type;
    private String project_name;
    private String project_manager_name;
//    @Temporal(TemporalType.TIMESTAMP)
    private String creation_date_and_time;
    private String project_execution_status;
    private String remedial_action_duration;

//    public void setCreationDateTime(Date dateAndTime){
//        this.creation_date_and_time=dateAndTime;
//    }

}
