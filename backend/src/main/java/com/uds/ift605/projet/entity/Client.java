package com.uds.ift605.projet.entity;

import com.uds.ift605.projet.dto.ClientDTO;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@Table(name ="client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "age")
    private int age;

    @Column(name = "weigth")
    private int weigth;

    @Column(name = "height")
    private int height;

    @OneToMany
    private List<ClientDTO> coachs = new ArrayList<>();

    @OneToMany
    private List<ClientDTO> friends = new ArrayList<>();

    @OneToMany
    private List<Challenge> challenges = new ArrayList<>();

    public Client(Long id, String firstName, String lastName, String userName, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }

    public Client() {
    }

    public Client(String firstName, String lastName, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }

    public Client(String firstName, String lastName, String userName, String password, int age, int weigth, int height) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.age = age;
        this.weigth = weigth;
        this.height = height;
    }

    public Client(Long id, String firstName, String lastName, String userName, String password, int age, int weigth, int height) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.age = age;
        this.weigth = weigth;
        this.height = height;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getWeigth() {
        return weigth;
    }

    public void setWeigth(int weigth) {
        this.weigth = weigth;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public List<ClientDTO> getCoachs() {
        return coachs;
    }

    public void setCoachs(List<ClientDTO> coachs) {
        this.coachs = coachs;
    }

    public List<ClientDTO> getFriends() {
        return friends;
    }

    public void setFriends(List<ClientDTO> friends) {
        this.friends = friends;
    }

    public void removeCoachById(Long idCoach){
        coachs = coachs.stream().filter(c -> !Objects.equals(c.getId(), idCoach)).collect(Collectors.toList());
    }

    public void removeFriendById(Long idFriend){
        friends = friends.stream().filter(c -> !Objects.equals(c.getId(), idFriend)).collect(Collectors.toList());
    }

    public List<Challenge> getChallenges() {
        return challenges;
    }

    public void setChallenges(List<Challenge> challenges) {
        this.challenges = challenges;
    }

    public void removeChallengeById(Long id){
        challenges = challenges.stream().filter(c -> !Objects.equals(c.getId(), id)).collect(Collectors.toList());
    }
}
