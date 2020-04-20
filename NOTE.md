React 적용 시도시 build.gradle(기록용)

buildscript {
    ext {
        springBootVersion = '2.1.7.RELEASE'
        mooworkVersion = '1.2.0'
    }
    repositories {
        mavenLocal()
        mavenCentral()
        jcenter()
        maven {
            url 'https://plugins.gradle.org/m2/'
        }
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
        classpath("com.moowork.gradle:gradle-node-plugin:${mooworkVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
apply plugin: 'com.moowork.node' 
apply plugin: 'application'

mainClassName = 'com.raccoon.quench.springboot.Application'
group 'com.raccoon.quench'
version '1.0-SNAPSHOT'
sourceCompatibility = 1.8

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
}

repositories {
    mavenCentral()
    jcenter()
}
dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    compile('org.projectlombok:lombok')
    compile('org.springframework.boot:spring-boot-starter-data-jpa')
    compile('com.h2database:h2')
    compile('org.springframework.boot:spring-boot-starter-mustache')
    compile('org.springframework.boot:spring-boot-starter-oauth2-client')
    compile('org.springframework.session:spring-session-jdbc')
    testCompile('org.springframework.boot:spring-boot-starter-test')
    testCompile('org.springframework.security:spring-security-test')

//    implementation group: 'org.springframework.boot', name: 'spring-boot-devtools'
}

def webappDir = "$projectDir/src/main/webapp"

node {
    version = '10.15.0'
    download=true
    workDir = file("${project.buildDir}/nodejs")
    npmWorkDir=file("${project.buildDir}/npm")
}

task appNpmInstall(type: NpmTask) {
    workingDir = file("${project.projectDir}/src/main/webapp")
    args = ["install"]
}

task appNpmBuild(type: NpmTask) {
    workingDir = file("${project.projectDir}/src/main/webapp")
    args = ['run', 'build']
}

task copyWebApp(type: Copy) {
    from "src/main/webapp/build" into 'build/resources/main/static/.'
}

appNpmBuild.dependsOn appNpmInstall
copyWebApp.dependsOn appNpmBuild
compileJava.dependsOn copyWebApp

